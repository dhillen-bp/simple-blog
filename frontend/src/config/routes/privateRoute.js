/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../utils/firebase_config";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => {
    return auth.currentUser !== null;
  });
  console.log(isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
      console.log("tidak login");
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default PrivateRoute;
