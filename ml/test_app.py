#!/usr/bin/env python3
"""
Test script to verify Flask app endpoints
"""

import requests
import json
import time

def test_flask_app():
    base_url = "http://localhost:5000"
    
    print("Testing Flask ML Application...")
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✓ Health endpoint working")
            print(f"  Response: {response.json()}")
        else:
            print(f"✗ Health endpoint failed: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("✗ Cannot connect to Flask app. Make sure it's running on port 5000")
        return False
    
    # Test prediction endpoint
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
    
    try:
        response = requests.post(
            f"{base_url}/predict",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✓ Prediction endpoint working")
            print(f"  Prediction: {result.get('prediction', 'Unknown')}")
            print(f"  Status: {result.get('status', 'Unknown')}")
        else:
            print(f"✗ Prediction endpoint failed: {response.status_code}")
            print(f"  Error: {response.text}")
    except Exception as e:
        print(f"✗ Prediction test failed: {e}")
    
    return True

if __name__ == "__main__":
    print("Make sure the Flask app is running first:")
    print("python app.py")
    print("\nThen run this test in another terminal.")
    print("=" * 50)
    
    # Wait a bit for user to start the app
    time.sleep(2)
    
    success = test_flask_app()
    if success:
        print("\n🎉 Flask app test completed!")
    else:
        print("\n❌ Flask app test failed!") 