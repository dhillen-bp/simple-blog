import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "../../../assets";
import "./footer.scss";

const Icon = ({ img }) => {
  return (
    <div className="icon-wrapper">
      <img className="icon-img" src={img} alt="icon" />
    </div>
  );
};

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-top">
        <div class="social-media">
          <div class="social-icons">
            <Icon img={FacebookIcon} />
            <Icon img={TwitterIcon} />
            <Icon img={InstagramIcon} />
            <Icon img={WhatsappIcon} />
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <ul class="footer-menu">
          <li>
            <p className="title">About Us</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa in
              voluptates aspernatur nemo fuga.
            </p>
          </li>
          <li>
            <p className="title">Contact Us</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa in
              voluptates aspernatur nemo fuga.
            </p>
          </li>
          <li>
            <p className="title">Need Help?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa in
              voluptates aspernatur nemo fuga.
            </p>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;