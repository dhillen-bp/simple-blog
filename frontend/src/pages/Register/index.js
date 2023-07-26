import React from "react";
import { RegisterBg } from "../../assets";
import { Button, Gap, Input, Link } from "../../components";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFormRegister } from "../../config/redux/action";

import { auth } from "../../utils/firebase_config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();

  const { formRegister } = useSelector((state) => state.registerReducer);
  const { email, password, name } = formRegister;
  const dispatch = useDispatch();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Update the user's profile with additional information
        updateProfile(user, {
          displayName: name,
          // photoURL: profilePicture
        })
          .then(() => {
            // Profile updated successfully
            sendEmailVerification(user);
            navigate("/login");
          })
          .catch((error) => {
            // Handle error if updating profile fails
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " Error: ", errorMessage);
      });
  };

  return (
    <div className="main-page">
      <div className="left">
        <img src={RegisterBg} className="bg-image" alt="imageBg" />
      </div>
      <div className="right">
        <p className="title">Form Register</p>
        <Input
          label="Full Name"
          placeholder="Full Name"
          onChange={(e) => dispatch(setFormRegister("name", e.target.value))}
        />
        <Gap height={18} />
        <Input
          label="Email"
          placeholder="Email"
          onChange={(e) => dispatch(setFormRegister("email", e.target.value))}
        />
        <Gap height={18} />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e) =>
            dispatch(setFormRegister("password", e.target.value))
          }
        />
        <Gap height={30} />
        <Button title="Register" onClick={handleRegister} />
        <Gap height={18} />
        <Link
          title="Kembali ke Login"
          onClick={() => {
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
};

export default Register;
