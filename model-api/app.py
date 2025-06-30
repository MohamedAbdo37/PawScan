from fastapi import FastAPI, UploadFile, File
from PIL import Image
from pipeline import analyze
from utils import pil_to_base64, draw_boxes, mask_to_image
import io

app = FastAPI()

@app.get("/")
def home():
    return {"message": "🚀 PawScan API is running!"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await file.read())).convert("RGB")

    result = analyze(img, highlight_class='cat')

    detection_img = draw_boxes(img, result["detection"])
    mask_img = mask_to_image(result["segmentation_mask"], result["highlight_id"])

    return {
        "classification": result["classification"],
        "detection_img": pil_to_base64(detection_img),
        "mask_img": pil_to_base64(mask_img),
    }
