/* eslint-disable no-unused-vars */
import React from "react";
import { LoginBg } from "../../assets";
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
        const token = credential.idToken;
        // The signed-in user info.
        const user = result.user;
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
        const token = userCredential.idToken;
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
    <div className="main-page">
      <div className="left">
        <img src={LoginBg} className="bg-image" alt="imageBg" />
      </div>
      <div className="right">
        <p className="title">Form Login</p>
        <Input
          label="Email"
          placeholder="Email"
          onChange={(e) => dispatch(setFormLogin("email", e.target.value))}
        />
        <Gap height={18} />
        <Input
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e) => dispatch(setFormLogin("password", e.target.value))}
        />
        <Gap height={30} />
        <Button title="Login" onClick={handleEmailSignIn} />
        <Gap height={18} />
        <Link
          title="Belum punya akun? Daftar Sekarang"
          onClick={() => {
            navigate("/register");
          }}
        />
        <Link title="Lupa Password? Reset" onClick={handleResetPassword} />
        <button
          type="submit"
          className="btn btn-secondary w-100 mb-3"
          onClick={handleGoogleSignIn}
        >
          SigIn With Google <i className="bi bi-google"></i>
        </button>
      </div>
    </div>
  );
};

export default Login;
