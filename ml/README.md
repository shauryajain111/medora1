# ML Application - Emergency Department Flag Prediction

This directory contains the machine learning application for predicting emergency department triage flags based on patient vitals and symptoms.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Ensure the model files are present:
   - `xgb_flag_model.pkl` - XGBoost model for flag prediction
   - `flag_label_encoder.pkl` - Label encoder for flag classes

## Running the Application

1. Start the Flask server:
```bash
python app.py
```

2. The server will run on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health` - Check application status and model loading

### Prediction
- **POST** `/predict` - Predict emergency department flag
  - Request body: JSON with patient vitals and symptoms
  - Response: JSON with prediction and status

## Testing

Run the test script to verify model functionality:
```bash
python test_model.py
```

## Model Information

- **Algorithm**: XGBoost
- **Target**: Emergency department triage flag (Green/Yellow/Red)
- **Features**: Age, gender, vitals (heart rate, blood pressure, SpO2, etc.), chief complaint

## Data Preprocessing

The `preprocessing.py` module handles:
- Categorical encoding for gender and chief complaint
- Numerical validation for vitals
- Missing value handling
- Feature scaling and normalization 