from PIL import Image, ImageDraw
import numpy as np
import io, base64

def pil_to_base64(img: Image.Image):
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    return base64.b64encode(buf.getvalue()).decode()

def draw_boxes(image: Image.Image, boxes):
    img = image.copy()
    draw = ImageDraw.Draw(img)
    for box in boxes:
        x1, y1, x2, y2 = box.xyxy[0].tolist()
        draw.rectangle([x1, y1, x2, y2], outline='lime', width=3)
    return img

def mask_to_image(mask: np.ndarray, highlight_class_id: int):
    colored = np.where(mask == highlight_class_id, 255, 0).astype(np.uint8)
    return Image.fromarray(colored)
