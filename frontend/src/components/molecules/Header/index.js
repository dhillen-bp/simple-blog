import React from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";
import { mernIcon } from "../../../assets";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo-wrapper">
        <img src={mernIcon} alt="mern-logo" />
        <p className="logo-app">MERN Blog</p>
      </div>
      <p
        className="menu-item"
        onClick={() => {
          navigate("/login");
        }}
      >
        Logout
      </p>
    </div>
  );
};

export default Header;
