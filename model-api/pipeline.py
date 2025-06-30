import os
import torch
import requests 
import torchvision.transforms as T
from torchvision.models import resnet50
from torchvision.models.segmentation import deeplabv3_resnet50
from PIL import Image
from ultralytics import YOLO
import numpy as np

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load models once
cls_model = resnet50(weights="IMAGENET1K_V1").to(device).eval()
seg_model = deeplabv3_resnet50(weights="DEFAULT").to(device).eval()
yolo_model = YOLO("yolov5su.pt")

# Load labels
imagenet_labels = requests.get("https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt").text.splitlines()
segmentation_labels = ['background', 'aeroplane', 'bicycle', 'bird', 'boat', 'bottle', 'bus', 'car', 'cat',
    'chair', 'cow', 'diningtable', 'dog', 'horse', 'motorbike', 'person', 'pottedplant', 'sheep', 'sofa', 'train', 'tvmonitor']


# Transforms
transform_cls = T.Compose([T.Resize((224, 224)), T.ToTensor()])
transform_seg = T.Compose([T.Resize((512, 512)), T.ToTensor()])

def analyze(image_pil: Image.Image, highlight_class='cat'):
    resized = transform_seg(image_pil)
    input_tensor = resized.unsqueeze(0).to(device)

    # Classification
    with torch.no_grad():
        cls_out = cls_model(transform_cls(image_pil).unsqueeze(0).to(device))
    cls_id = int(cls_out.argmax(dim=1).item())
    cls_label = imagenet_labels[cls_id]

    # Detection
    yolo_results = yolo_model.predict(image_pil, device='cpu', conf=0.5, verbose=False)[0]
    boxes = yolo_results.boxes

    # Segmentation
    with torch.no_grad():
        seg_out = seg_model(input_tensor)['out'][0].argmax(0).cpu().numpy()

    return {
        "classification": cls_label,
        "detection": boxes,
        "segmentation_mask": seg_out,
        "highlight_id": segmentation_labels.index(highlight_class),
    }