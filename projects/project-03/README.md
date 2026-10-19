# Plant Disease Classifier — Edge AI Computer Vision

## Overview
Deep learning computer vision diagnostic pipeline that identifies crop pathologies, leaf blights, and nutrient deficiencies directly in the field with offline edge inference capabilities.

## Technical Architecture
- **Vision Pipeline:** TensorFlow / PyTorch, EfficientNet-B4 & MobileNetV3 architectures
- **Inference:** ONNX Runtime & TensorFlow Lite quantization
- **Interactive UI:** Streamlit & React Mobile Webview
- **Deployment:** Docker, FastAPI microservice
