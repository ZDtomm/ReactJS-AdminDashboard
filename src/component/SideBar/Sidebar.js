import React from "react";
import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import CategoryIcon from '@mui/icons-material/Category';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/restaurant" style={{ textDecoration: "none" }}>
            <li>
              <RestaurantIcon className="icon" />
              <span>Restaurant</span>
            </li>
          </Link>
          <Link to="/tables" style={{ textDecoration: "none" }}>
            <li>
              <TableRestaurantIcon className="icon" />
              <span>Tables</span>
            </li>
          </Link>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>
          <Link to="/menu" style={{ textDecoration: "none" }}>
            <li>
              <RestaurantMenuIcon className="icon" />
              <span>Menu</span>
            </li>
          </Link>
          <p className="title">Reservation</p>
          <Link to="/reservation" style={{ textDecoration: "none" }}>
            <li>
              <MenuBookIcon className="icon" />
              <span>Reservation</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
