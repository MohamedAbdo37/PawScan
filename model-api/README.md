---
title: PawScan Model API
emoji: 🐾
colorFrom: green
colorTo: blue
sdk: docker
app_file: app.py
pinned: false
---

# PawScan AI Model API

A FastAPI backend for classification, detection (YOLOv5), and segmentation (DeepLabV3).
Deployed on Hugging Face Spaces.

- Endpoint: `/analyze` (POST)
- Input: Image file
- Output: JSON with classification label, detection image, and segmentation mask (base64)
