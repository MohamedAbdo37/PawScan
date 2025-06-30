FROM python:3.10-slim

# 🧩 Add required system packages
RUN apt-get update && apt-get install -y \
    git \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set workdir
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your code
COPY . .

# Expose port (Hugging Face expects 7860)
EXPOSE 7860

# Run the app
ENV YOLO_CONFIG_DIR=/tmp
ENV TORCH_HOME=/tmp/torch_cache


CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
