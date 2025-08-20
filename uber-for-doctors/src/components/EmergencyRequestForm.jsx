import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmergencyRequestForm.css";

const genderOptions = ["Male", "Female", "Other"];

function EmergencyRequestForm({ requestType = "doctor" }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    chief_complaint: "",
    vitalsVisible: false,
    vitals: {
      age: "",
      gender: "",
      heart_rate: "",
      sbp: "",
      dbp: "",
      spo2: "",
      resp_rate: "",
      temperature: ""
    }
  });

  const [locating, setLocating] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(formData.vitals).includes(name)) {
      setFormData((prev) => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          [name]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => {
            setFormData((prev) => ({
              ...prev,
              address: data.display_name || ""
            }));
            setLocating(false);
          })
          .catch((err) => {
            console.error(err);
            setLocating(false);
            alert("Could not fetch address.");
          });
      },
      (error) => {
        console.error(error);
        setLocating(false);
        alert("Unable to retrieve location.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.chief_complaint ||
      !formData.vitals.age ||
      !formData.vitals.gender
    ) {
      alert("Please fill out required fields including vitals.");
      return;
    }

    const complaintRecord = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      chief_complaint: formData.chief_complaint
    };

    console.log("SAVE THIS JSON TO FILE:", JSON.stringify(complaintRecord, null, 2));

    try {
      // For now, simulate the API call since the backend might not be running
      // In production, this would be a real API endpoint
      const mockResponse = {
        data: {
          doctor: {
            name: "Dr. Smith",
            specialty: "Emergency Medicine",
            eta: "15 minutes"
          },
          advice: "Stay calm and comfortable. Help is on the way.",
          status: "confirmed"
        }
      };

      navigate("/status", {
        state: {
          doctor: mockResponse.data.doctor,
          advice: mockResponse.data.advice,
          patient: formData,
          requestType: requestType
        }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit emergency request");
    }
  };

  return (
    <div className="emergency-form-wrapper">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Request {requestType === 'nurse' ? 'Nurse' : 'Doctor'}
      </h2>
      <form className="emergency-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="address-row">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={locating}
            className="location-button"
          >
            {locating ? "Locating..." : "📍 Use Location"}
          </button>
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="chief_complaint"
          placeholder="Describe Symptoms"
          value={formData.chief_complaint}
          onChange={handleChange}
          rows="3"
          required
        />

        <button
          type="button"
          className="toggle-vitals"
          onClick={() =>
            setFormData((prev) => ({
              ...prev,
              vitalsVisible: !prev.vitalsVisible
            }))
          }
        >
          {formData.vitalsVisible ? "Hide Vitals" : "Fill Vitals"}
        </button>

        {formData.vitalsVisible && (
          <div className="vitals-section">
            <label>Age (years):</label>
            <input
              type="number"
              name="age"
              value={formData.vitals.age}
              onChange={handleChange}
              required
              min="0"
              max="120"
            />

            <label>Gender:</label>
            <div className="gender-toggle">
              {genderOptions.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={formData.vitals.gender === g ? "selected" : ""}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      vitals: { ...prev.vitals, gender: g }
                    }))
                  }
                >
                  {g}
                </button>
              ))}
            </div>

            <label>Heart Rate (bpm):</label>
            <input
              type="number"
              name="heart_rate"
              value={formData.vitals.heart_rate}
              onChange={handleChange}
              min="0"
              max="220"
            />

            <label>SBP (mmHg):</label>
            <input
              type="number"
              name="sbp"
              value={formData.vitals.sbp}
              onChange={handleChange}
              min="0"
              max="300"
            />

            <label>DBP (mmHg):</label>
            <input
              type="number"
              name="dbp"
              value={formData.vitals.dbp}
              onChange={handleChange}
              min="0"
              max="200"
            />

            <label>SpO2 (%):</label>
            <input
              type="number"
              name="spo2"
              value={formData.vitals.spo2}
              onChange={handleChange}
              min="0"
              max="100"
            />

            <label>Respiratory Rate (breaths/min):</label>
            <input
              type="number"
              name="resp_rate"
              value={formData.vitals.resp_rate}
              onChange={handleChange}
              min="0"
              max="60"
            />

            <label>Temperature (°F):</label>
            <input
              type="number"
              name="temperature"
              value={formData.vitals.temperature}
              onChange={handleChange}
              min="80"
              max="110"
            />
          </div>
        )}

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default EmergencyRequestForm;
