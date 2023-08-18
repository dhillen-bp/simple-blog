import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="px-20 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 h-20 flex flex-col items-center justify-center text-center text-slate-100">
      <p className="">
        Copyright by ©️ <span className="font-bold text-white"> Dhillen </span>
      </p>
      <p className="">
        Want to contribute?
        <span
          className="underline hover:text-white pl-1 cursor-pointer"
          onClick={() => {
            navigate("/create-blog");
          }}
        >
          Create a Post Now
        </span>
      </p>
    </footer>
  );
};

export default Footer;
