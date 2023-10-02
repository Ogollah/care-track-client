// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../static/img/logo.png";

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">
                {/* <img src={Logo} alt='logo' /> */}
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/patients" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/registration" className="nav-link">
                            Patient Registration
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
