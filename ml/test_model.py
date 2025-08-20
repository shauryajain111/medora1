#!/usr/bin/env python3
"""
Test script to verify ML model loading and prediction
"""

import joblib
import pandas as pd
from preprocessing import preprocess_input

def test_model():
    try:
        # Test model loading
        print("Testing model loading...")
        model = joblib.load("xgb_flag_model.pkl")
        print("✓ Model loaded successfully")
        
        # Test label encoder loading
        print("Testing label encoder loading...")
        try:
            label_encoder = joblib.load("flag_label_encoder.pkl")
            print("✓ Label encoder loaded successfully")
        except:
            print("⚠ Label encoder not found, using fallback")
            from sklearn.preprocessing import LabelEncoder
            label_encoder = LabelEncoder()
            label_encoder.classes_ = ["Green", "Red", "Yellow"]
        
        # Test preprocessing
        print("Testing preprocessing...")
        test_data = {
            "age": 45,
            "gender": "Male",
            "heart_rate": 80,
            "sbp": 120,
            "dbp": 80,
            "spo2": 98,
            "resp_rate": 16,
            "temperature": 98.6,
            "chief_complaint": "Chest pain"
        }
        
        processed_df = preprocess_input(test_data)
        print("✓ Preprocessing successful")
        print(f"Processed data shape: {processed_df.shape}")
        
        # Test prediction
        print("Testing prediction...")
        prediction_encoded = model.predict(processed_df)[0]
        prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]
        print(f"✓ Prediction successful: {prediction_label}")
        
        return True
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == "__main__":
    success = test_model()
    if success:
        print("\n🎉 All tests passed!")
    else:
        print("\n❌ Some tests failed!") 