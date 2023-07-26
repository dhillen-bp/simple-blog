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
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("error: ", error);
      });
  };

  useEffect(() => {
    // Ambil informasi pengguna yang sedang login
    const user = auth.currentUser;

    if (user !== null) {
      // Dapatkan data dari provider (misalnya Google)
      const providerData = user.providerData[0];

      // Simpan data pengguna ke dalam state
      setUserProfile({
        displayName: providerData.displayName,
        email: providerData.email,
        photoURL: providerData.photoURL,
      });
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
