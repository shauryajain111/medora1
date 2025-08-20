import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import "./RequestStatus.css";



function RequestStatus() {

  const location = useLocation();

  const navigate = useNavigate();

  const [status, setStatus] = useState("searching");

  const [doctor, setDoctor] = useState(null);

  const [advice, setAdvice] = useState("");



  useEffect(() => {

    if (!location.state?.patient) {

      navigate("/");

      return;

    }



    const timer = setTimeout(() => {

      setStatus("assigned");

      setDoctor(

        location.state.doctor || {

          name: "Dr. Priya Sharma",

          specialty: "General Physician",

          photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP8E04i4f3RG9W9408PPhuTYafgQOHWStcnA&s",

          contact: "+91-9876543210",

          clinic: "City Health Clinic",

        }

      );

      setAdvice(location.state.advice || "[AI recommendations will appear here]");

    }, 3000);



    return () => clearTimeout(timer);

  }, [location, navigate]);



  return (

    <div className="status-wrapper">

      {status === "searching" && (

        <>

          <h2>Contacting doctors nearby...</h2>

          <p>Please wait while we connect you to the nearest available doctor.</p>

        </>

      )}



      {status === "assigned" && doctor && (

        <>

          <h2>Doctor is on the way!</h2>

          <div className="doctor-info">

            <img src={doctor.photo} alt={doctor.name} />

            <div className="doctor-details">

              <h3>{doctor.name}</h3>

              <p>{doctor.specialty}</p>

              <p>{doctor.clinic}</p>

              <p>Contact: {doctor.contact}</p>

            </div>

          </div>

          <div className="recommendations">

            <h4>While the doctor is coming, follow these instructions:</h4>

            <ul>

              <li>Keep the patient calm and comfortable.</li>

              <li>Ensure good airflow in the room.</li>

              <li>Collect any medical records.</li>

              <li>

                <em>{advice}</em>

              </li>

            </ul>

          </div>

        </>

      )}

    </div>

  );

}



export default RequestStatus;