import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    usn: "",
    phone: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleClick(event) {
    const userReg = {
      name: user.name,
      email: user.email,
      usn: user.usn,
      phone: user.phone,
    };

    axios
      .post("/registerteam", userReg)
      .then((response) => {
        if (response.status === 200) alert("Thank you for registering !!!");
        setUser({
          name: "",
          email: "",
          usn: "",
          phone: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    event.preventDefault();
  }

  return (
    <div className="register-wrapper" style={{ backgroundColor: "#f0f5f9" }}>
      <div className="form-container">
        <div className="left-col">
          <div className="event-details">
            <img src="../imgs/pic.png" alt="pic" />
            <h1> ROBOEXPO</h1>
            <p>Venue : Birla Auditorium</p>
            <p>Date : 17/12/2022</p>
            <p>Time : 2pm </p>
          </div>
        </div>
        <div className="details">
          <form>
            <label for="tname">
              NAME :
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                id="tname"
                value={user.name}
                required
                onChange={handleChange}
              />
            </label>
            <label for="tlead">
              EMAIL :
              <input
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={user.email}
                placeholder="Enter your email"
                id="tlead"
              />
            </label>
            <label for="m2">
              USN :
              <input
                type="text"
                value={user.usn}
                onChange={handleChange}
                name="usn"
                required
                placeholder="Enter your usn"
                id="m2"
              />
            </label>
            <label for="m3">
              PHONE NO :
              <input
                type="tel"
                onChange={handleChange}
                name="phone"
                required
                value={user.phone}
                placeholder="Enter your phone number"
                id="m3"
              />
            </label>
          </form>
          <button
            onClick={handleClick}
            className="btn"
            style={{
              alignSelf: "flex-end",
              margin: ".5rem 1rem",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
