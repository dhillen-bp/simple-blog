/* eslint-disable no-unused-vars */
import React from "react";
import { GoogleIcon, LoginBg } from "../../assets";
import { Button, Gap, Input, Link } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFormLogin } from "../../config/redux/action";

import { auth } from "../../utils/firebase_config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

const Login = () => {
  const { form } = useSelector((state) => state.loginReducer);
  const { email, password } = form;
  const dispatch = useDispatch();
  // handler sigin with google
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // The signed-in user info.
        const user = result.user;
        const token = user.accessToken;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("token: ", token);
        console.log("user: ", user);
        sessionStorage.setItem("accessToken", token);
        console.log(localStorage);
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const token = user.accessToken;
        if (user.emailVerified) {
          sessionStorage.setItem("accessToken", token);
          navigate("/");
          console.log("user: ", user);
        } else {
          console.log(
            "Email is not verified. Please check your email for verification."
          );
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("error code: ", errorCode);
        console.log("error msg: ", errorMessage);
      });
  };

  // need to fill the email
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row mx-auto mt-2 px-10 py-10 w-full h-full md:px-20 md:pt-20 md:items-start md:justify-around">
      <div className="shadow-md rounded-md p-2 md:p-5 h-96 md:w-1/3 self-center ">
        <img src={LoginBg} alt="Login-Img" className="" />
      </div>

      <div className="mt-5 md:ml-10 md:w-1/2 md:mt-0 ">
        <h1 className="text-xl font-bold border-b-2 border-orange-500 pb-1 mb-4 md:mb-14">
          Sign In
        </h1>
        <div className="mb-4 md:mb-6">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => dispatch(setFormLogin("email", e.target.value))}
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
            onChange={(e) => dispatch(setFormLogin("password", e.target.value))}
          />
        </div>
        <div className="mb-4 md:mb-6">
          <button
            className="w-full px-4 py-2 rounded-lg bg-orange-500 text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-400"
            onClick={handleEmailSignIn}
          >
            Sign In
          </button>
        </div>
        <div className="mb-4 md:mb-6">
          <button
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleGoogleSignIn}
          >
            Sign In With Google
            <i className="bi bi-google ml-1"></i>
          </button>
        </div>
        <p
          className="text-center mb-1"
          onClick={() => {
            navigate("/register");
          }}
        >
          Don't have an account?
          <span className="text-blue-600 ml-1 cursor-pointer inline-block hover:underline">
            Sign Up Now
          </span>
        </p>
        <p className="text-center" onClick={handleResetPassword}>
          Forget Password?
          <span className="text-blue-600 ml-1 cursor-pointer inline-block hover:underline">
            Reset Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
