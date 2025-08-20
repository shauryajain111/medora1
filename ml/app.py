from flask import Flask, request, jsonify
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
from preprocessing import preprocess_input

app = Flask(__name__)

try:
    model = joblib.load("xgb_flag_model.pkl")
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

try:
    label_encoder = joblib.load("flag_label_encoder.pkl")
    print("Label encoder loaded successfully")
except Exception as e:
    print(f"Error loading label encoder: {e}")
    # Fallback to manual classes
    label_encoder = LabelEncoder()
    label_encoder.classes_ = ["Green", "Red", "Yellow"] 



@app.route('/predict', methods=['POST'])
def predict_flag():
    if model is None:
        return jsonify({
            "error": "Model not loaded",
            "status": "failed"
        }), 500
    
    try:
        input_json = request.get_json(force=True)
        
        if not input_json:
            return jsonify({
                "error": "No input data provided",
                "status": "failed"
            }), 400

        processed_df = preprocess_input(input_json)

        prediction_encoded = model.predict(processed_df)[0]
        prediction_label = label_encoder.inverse_transform([prediction_encoded])[0]

        return jsonify({
            "prediction": prediction_label,
            "status": "success"
        })
    
    except Exception as e:
        return jsonify({
            "error": str(e),
            "status": "failed"
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "label_encoder_loaded": hasattr(label_encoder, 'classes_')
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)