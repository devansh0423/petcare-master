import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Header.css";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/Cart";
import { Badge } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="s-main">
        <div>
          <img
            src="https://th.bing.com/th/id/OIP.f-ZJcZ-2u_GfwcYyAG5zCQHaGL?rs=1&pid=ImgDetMain"
            alt="logo"
            height={"75px"}
            width={"200px"}
          />
        </div>
        <div className="nav">
          <SearchInput />

          <NavLink className="nav-items" to={"/"}>
            <AiFillHome />
            Home
          </NavLink>
          <NavLink className="nav-items" to={"/products"}>
            Products
          </NavLink>

          {!auth.user?.name ? (
            <>
              <NavLink className="nav-items" to={"/register"}>
                Sign Up
              </NavLink>
              <NavLink className="nav-items" to={"/login"}>
                Log in
              </NavLink>
              <NavLink className="nav-items " to={"/cart"}>
                <FaCartShopping className="cart" />
                <Badge
                  count={cart?.length}
                  className="cartkBadge"
                  style={{ background: "#16A34A" }}
                />
              </NavLink>
            </>
          ) : (
            <div className="cardAndToggle">
              <NavLink className="nav-items " to={"/cart"}>
                <FaCartShopping className="cart" />
                <Badge
                  count={cart?.length}
                  className="cartkBadgelg"
                  style={{ background: "#16A34A" }}
                />
              </NavLink>

              <div className="dropdown">
                <NavLink
                  className=" dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="dropdown-img"
                    src={auth?.user?.image}
                    alt=""
                  />
                </NavLink>

                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1
                          ? "admin/profile"
                          : "user/profile"
                      } `}
                      className="dropdown-item"
                    >
                      {auth?.user?.name}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      } `}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/forgot-password"} className="dropdown-item">
                      change password
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/"} className="dropdown-item">
                      <div onClick={handleLogout}>Logout</div>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <></>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
