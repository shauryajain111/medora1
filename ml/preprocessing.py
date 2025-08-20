import pandas as pd

def preprocess_input(json_data):
    if not json_data:
        raise ValueError("Input data is empty")
    
    df = pd.DataFrame([json_data])
  
    # Drop columns that shouldn't be used for prediction
    cols_to_drop = ['icu_admit', 'hospital_admit', 'mortality', 'flag'] 
    df = df.drop(columns=[col for col in cols_to_drop if col in df.columns], errors='ignore')

    # Handle categorical columns
    categorical_cols = ['gender', 'chief_complaint']
    for col in categorical_cols:
        if col in df.columns:
            # Convert to string and handle NaN values
            df[col] = df[col].astype(str).fillna('unknown')
            df[col] = df[col].str.lower()
            df[col] = df[col].astype('category').cat.codes
    
    # Handle numerical columns - ensure they're numeric
    numerical_cols = ['age', 'heart_rate', 'sbp', 'dbp', 'spo2', 'resp_rate', 'temperature']
    for col in numerical_cols:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    # Ensure all columns are numeric for the model
    for col in df.columns:
        if df[col].dtype == 'object':
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    
    return df