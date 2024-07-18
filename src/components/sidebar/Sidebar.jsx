import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PortraitIcon from "@mui/icons-material/Portrait";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const { dispatch: authDispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        authDispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/">
          <span className="logo" id="logo2">
            Djago
          </span>
          <span className="logo">Store</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LIST</p>
          <Link to="/users">
            <li>
              <AccountBoxIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/products">
            <li>
              <Inventory2Icon className="icon" />
              <span>Products</span>
            </li>
          </Link>

          <li>
            <ShoppingCartIcon className="icon" />
            <span>Orders</span>
          </li>
          <Link to="/categories">
            <li>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <PortraitIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  );
};

export default Sidebar;