import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../../../assets";

import { auth } from "../../../utils/firebase_config";
import { signOut } from "firebase/auth";

const Header = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.

        localStorage.removeItem("userProfile"); // Clear user profile from local storage
        sessionStorage.clear();
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

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-10 py-3 font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white shadow-lg md:px-20">
      <div className="flex items-center gap-2">
        <img
          src={LogoIcon}
          alt="Blog-Logo"
          className="rounded-full h-10 w-auto"
        />
        <p href="#" className="text-lg hidden md:inline lg:text-xl">
          How To Learn
        </p>
      </div>
      <nav className="hidden md:flex">
        <ul className="flex space-x-8 text-semibold">
          <li>
            <p
              className="cursor-pointer"
              onClick={() => {
                navigate(`/`);
              }}
            >
              Home
            </p>
          </li>
          <li>
            <p href="#" className="">
              About
            </p>
          </li>
          <li>
            <p
              className="cursor-pointer"
              onClick={() => {
                navigate(`/myblog`);
              }}
            >
              My Blog
            </p>
          </li>
          <li>
            <p href="#" className="">
              Contact
            </p>
          </li>
        </ul>
      </nav>

      <div className="md:hidden relative">
        <button
          id="hamburgerButton"
          className={`text-white focus:outline-none transition-transform ${
            isDropdownOpen ? "shadow-xl p-1 bg-orange-700" : ""
          }`}
          onClick={toggleDropdown}
        >
          <div className="w-6 h-[3px] bg-white"></div>
          <div className="w-6 h-[3px] mt-1 bg-white"></div>
          <div className="w-6 h-[3px] mt-1 bg-white"></div>
        </button>
        <div
          id="dropdownMenu"
          className={`${
            isDropdownOpen ? "" : "hidden"
          } absolute bg-orange-100 mt-2 w-56 py-2 rounded-md shadow-lg right-0 top-4`}
        >
          <p
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              navigate(`/`);
            }}
          >
            Home
          </p>
          <p
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            About
          </p>
          <p
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Blog
          </p>
          <p
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Contact
          </p>
          <p
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          >
            Login
          </p>
        </div>
      </div>
      <div className="hidden md:flex items-center">
        <ul className="text-bold flex space-x-4">
          <li>
            <p
              className="cursor-pointer"
              onClick={userProfile ? handleSignOut : () => navigate("/login")}
            >
              {userProfile ? "Logout" : "Login"}
            </p>
          </li>
          {userProfile ? (
            <li className="inline-block">{userProfile.displayName}</li>
          ) : null}
        </ul>
      </div>
    </header>
  );
};

export default Header;
