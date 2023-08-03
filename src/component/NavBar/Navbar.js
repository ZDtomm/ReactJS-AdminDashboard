import React, { useState } from 'react';
import "./navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAvatarClick = () => {
      setShowDropdown((prevState) => !prevState); 
    };

    const handleLogout = () => {
        // Perform logout logic here
        localStorage.removeItem('token'); 
        dispatch({ type: 'LOGOUT' });
        navigate('/'); 
      };

  return (
    <div className="navbar">
      <div className="wrapper">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">FoodEase</span>
        </Link>
      </div>
        <div className="search">
          <input type="text" className="search-input" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
          <button className="avatar-button" onClick={handleAvatarClick}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
