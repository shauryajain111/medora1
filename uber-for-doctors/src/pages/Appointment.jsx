import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Appointment.css";


const doctorData = {
  "General Physician": [
    {
      name: "Dr. Ramesh Sharma",
      hospital: "AIIMS Delhi",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOwKoG6F9Wbuv7Kuh6b2hoRDIvsFjbYW1Ig&s",
      phone: "+91-9876543210",
    },
    {
      name: "Dr. Anjali Verma",
      hospital: "Fortis Hospital Delhi",
      photo: "https://st2.depositphotos.com/4153545/8174/i/950/depositphotos_81742850-stock-photo-indian-woman-doctor.jpg",
      phone: "+91-9811122233",
    },
    {
      name: "Dr. Vivek Singh",
      hospital: "Max Hospital Delhi",
      photo: "https://static9.depositphotos.com/1005893/1105/i/950/depositphotos_11050986-stock-photo-indian-male-doctor.jpg",
      phone: "+91-9876549876",
    },
  ],
  Cardiologist: [
    {
      name: "Dr. Priya Khanna",
      hospital: "Apollo Hospital Delhi",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP8E04i4f3RG9W9408PPhuTYafgQOHWStcnA&s",
      phone: "+91-9812233445",
    },
    {
      name: "Dr. Sanjay Mehta",
      hospital: "BLK Hospital Delhi",
      photo: "https://t4.ftcdn.net/jpg/02/69/98/99/360_F_269989951_9Gf7PWaRtrpm2EochO3D5WVn22sFZbNZ.jpg",
      phone: "+91-9845567788",
    },
    {
      name: "Dr. Neha Gupta",
      hospital: "AIIMS Delhi",
      photo: "https://st.depositphotos.com/49005766/54607/i/450/depositphotos_546075446-stock-photo-indian-female-doctor-portrait-south.jpg",
      phone: "+91-9876123450",
    },
  ],
  Orthopedic: [
    {
      name: "Dr. Rajeev Kapoor",
      hospital: "Safdarjung Hospital Delhi",
      photo: "https://st4.depositphotos.com/1017986/21088/i/450/depositphotos_210888716-stock-photo-happy-doctor-with-clipboard-at.jpg",
      phone: "+91-9815567890",
    },
    {
      name: "Dr. Seema Jain",
      hospital: "Fortis Hospital Delhi",
      photo: "https://www.shutterstock.com/image-photo/medical-concept-indian-doctor-uniform-600nw-2313987627.jpg",
      phone: "+91-9834456677",
    },
    {
      name: "Dr. Amit Sinha",
      hospital: "Max Hospital Delhi",
      photo: "https://i.pinimg.com/736x/28/90/51/28905133f922c06fd8a2c8a72ea3266a.jpg",
      phone: "+91-9898989898",
    },
  ],
};

function Appointment() {
  const [category, setCategory] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState({
    name: "",
    phone: "",
    age: "",
    reason: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBook = () => {
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }
    if (!patientData.name || !patientData.phone || !patientData.age) {
      alert("Please fill in all patient details.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/doctor-confirmation", {
        state: { doctor: selectedDoctor, patient: patientData }
      });
    }, 2000);
  };

  return (
    <div className="appointment-page">
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid #3498db', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p>Booking appointment...</p>
        </div>
      )}

      <h2>Book an Appointment</h2>

      <div className="form-section">
        <label>Select Category:</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSelectedDoctor(null);
          }}
        >
          <option value="">-- Select --</option>
          {Object.keys(doctorData).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {category && (
        <div className="doctors-list">
          {doctorData[category].map((doc, index) => (
            <div
              key={index}
              className={`doctor-card ${
                selectedDoctor === doc ? "selected" : ""
              }`}
              onClick={() => setSelectedDoctor(doc)}
            >
              <img src={doc.photo} alt={doc.name} />
              <div>
                <h4>{doc.name}</h4>
                <p>{doc.hospital}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <div className="form-section">
          <h3>Patient Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={patientData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            value={patientData.phone}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={patientData.age}
            onChange={handleInputChange}
          />
          <textarea
            name="reason"
            placeholder="Reason for Visit"
            value={patientData.reason}
            onChange={handleInputChange}
          />
          <button onClick={handleBook}>Book Appointment</button>
        </div>
      )}
    </div>
  );
}

export default Appointment;
