import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header-container">
            <div className="header-nav">
                <ul className="nav-list">
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/add" className="nav-link">Add Notification</Link>
                    </li>
                    <li>
                        <Link to="/notifications" className="nav-link">View Notifications</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;