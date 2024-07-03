import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div>
        <h4>Admin panel</h4>
        <ul className="list-group">
          <NavLink to={"/"} className="list-group-item ">
            {" "}
            Home
          </NavLink>
          <NavLink
            to={"/dashboard/admin/create-category"}
            className="list-group-item"
          >
            Create category
          </NavLink>
          <NavLink
            to={"/dashboard/admin/create-product"}
            className="list-group-item"
          >
            Create product
          </NavLink>
          <NavLink to={"/dashboard/admin/products"} className="list-group-item">
            products
          </NavLink>
          <NavLink to={"/dashboard/admin/orders"} className="list-group-item">
            user orders
          </NavLink>
          <NavLink
            to={"/dashboard/admin/all-users"}
            className="list-group-item"
          >
            All users
          </NavLink>
          <NavLink
            to={"/dashboard/admin/all-doctors"}
            className="list-group-item"
          >
            All doctors
          </NavLink>
          <NavLink
            to={"/dashboard/admin/create-groomingpackages"}
            className="list-group-item"
          >
            create Grooming packages
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
