// src/client/src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header>
            <div className="navbar-container">
                <button className="menu-toggle" onClick={toggleMenu}>
                    <FaBars />
                </button>
                <div className="logo">
                    <Link to="/">ClubHouseHomie</Link>
                </div>
                <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
                    <ul>
                        <li>
                            <Link to="/" onClick={closeMenu}>Home</Link>
                        </li>
                        <li>
                            <Link to="/products" onClick={closeMenu}>Products</Link>
                        </li>
                        <li>
                            <Link to="/courses" onClick={closeMenu}>Courses</Link>
                        </li>
                        <li>
                            <Link to="/blog" onClick={closeMenu}>ClubHouse Talk</Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={closeMenu}>About Us</Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-right">
                    <Link to="/account"><FaUser /></Link>
                    <Link to="/cart"><FaShoppingCart /></Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
