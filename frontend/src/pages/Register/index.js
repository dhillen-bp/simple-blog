import React from "react";
// import { RegisterBg } from "../../assets";

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
import { LoginBg } from "../../assets";

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
    <div className="flex flex-col md:flex-row mx-auto mt-2 px-10 py-10 w-full h-full md:px-20 md:pt-20 md:items-center md:justify-around">
      <div className="shadow-md rounded-md p-2 md:p-5 h-96 md:w-1/3 self-center">
        <img src={LoginBg} alt="Login-Img" className="" />
      </div>

      <div className="mt-5 md:ml-10 md:w-1/2 md:mt-0 ">
        <h1 className="text-xl font-bold border-b-2 border-orange-500 pb-1 mb-4 md:mb-14">
          Sign Up
        </h1>
        <div className="mb-4 md:mb-6">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => dispatch(setFormRegister("name", e.target.value))}
          />
        </div>
        <div className="mb-4 md:mb-6">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => dispatch(setFormRegister("email", e.target.value))}
          />
        </div>
        <div className="mb-4 md:mb-6">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) =>
              dispatch(setFormRegister("password", e.target.value))
            }
          />
        </div>
        <div className="mb-4 md:mb-6">
          <button
            className="w-full px-4 py-2 rounded-lg bg-orange-500 text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        </div>

        <p
          className="text-center mb-1"
          onClick={() => {
            navigate("/login");
          }}
        >
          Have an account?
          <span className="text-blue-600 ml-1 cursor-pointer inline-block hover:underline">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
