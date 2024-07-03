import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <>
      <div>
        <h4>Dashboard</h4>
        <ul className="list-group">
          <NavLink to={"/"} className="list-group-item ">
            {" "}
            Home
          </NavLink>
          <NavLink to={"/dashboard/user/profile"} className="list-group-item">
            profile
          </NavLink>
          <NavLink to={"/dashboard/user/orders"} className="list-group-item">
            My orders
          </NavLink>
          <NavLink
            to={"/dashboard/user/my-appointments"}
            className="list-group-item"
          >
            My Appointments
          </NavLink>
          <NavLink
            to={"/dashboard/user/apply-doctor"}
            className="list-group-item"
          >
            Apply as a Doctor
          </NavLink>
          <NavLink
            to={"/dashboard/user/all-doctors"}
            className="list-group-item"
          >
            view doctors
          </NavLink>
          <NavLink to={"/dashboard/user/packages"} className="list-group-item">
            Grooming packages
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
