import React, { useEffect, useState } from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { mernIcon } from "../../../assets";

import { auth } from "../../../utils/firebase_config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("userProfile"); // Clear user profile from local storage
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("error: ", error);
      });
  };

  useEffect(() => {
    // Retrieve user profile data from local storage on page refresh
    const storedUserProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (storedUserProfile) {
      setUserProfile(storedUserProfile);
    } else {
      // If no stored user profile, fetch from Firebase Auth
      const user = auth.currentUser;

      if (user !== null) {
        const providerData = user.providerData[0];
        const userProfileData = {
          displayName: providerData.displayName,
          email: providerData.email,
          // photoURL: providerData.photoURL,
        };

        // Store user profile data in local storage
        localStorage.setItem("userProfile", JSON.stringify(userProfileData));

        // Set userProfile state
        setUserProfile(userProfileData);
      }
    }
  }, []);

  return (
    <div className="header">
      <div className="logo-wrapper">
        <img src={mernIcon} alt="mern-logo" />
        <p className="logo-app">MERN Blog</p>
      </div>
      <div className="profil-wrapper">
        {userProfile ? (
          <p className="menu-item profil">{userProfile.displayName}</p>
        ) : null}
        <p
          className="menu-item"
          onClick={userProfile ? handleSignOut : () => navigate("/login")}
        >
          {userProfile ? "Logout" : "Login"}
        </p>
      </div>
    </div>
  );
};

export default Header;
