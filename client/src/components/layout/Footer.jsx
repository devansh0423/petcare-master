import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <NavLink to={"/about"}>About</NavLink>
      <NavLink to={"/contact"}>Contact</NavLink>
      <NavLink to={"/policy"}>Privacy policy</NavLink>
    </div>
  );
};

export default Footer;
