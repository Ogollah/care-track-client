import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../static/img/logo.png';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="container-fluid" id="navbarNav">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        Care Track
                    </a>
                </div>
                <ul className="navbar-nav navbar-right">
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
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Log out
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
