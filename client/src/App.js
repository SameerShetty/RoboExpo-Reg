import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  const [isload, setload] = useState(true);
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
  useEffect(() => {
    setTimeout(() => {
      setload(false);
    }, 2500);
  }, []);

  function handleClick(event) {
    if (user.name && user.email && user.usn && user.phone) {
      const userReg = {
        name: user.name,
        email: user.email,
        usn: user.usn,
        phone: user.phone,
      };
      axios
        .post("/registerteam", userReg)
        .then((response) => {
          if (response.status === 200)
            toast.success("Thank you for registering !!!");
          setUser({ name: "", email: "", usn: "", phone: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please fill all the details !!!");
    }

    event.preventDefault();
  }

  return (
    <div className="register-wrapper" style={{ backgroundColor: "#f0f5f9" }}>
      <div style={{ display: isload ? "block" : "none" }}>
        <Loader />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="form-container">
        <div className="left-col">
          <div className="event-details">
            <img src="../imgs/pic.png" alt="pic" />
            <h1> ROBOEXPO</h1>
            <p>Venue : Birla Auditorium</p>
            <p>Date : 17-12-2022 </p>
            <p>Time : 2 pm </p>
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
