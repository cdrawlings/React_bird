import React from 'react';
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {Link} from 'react-router-dom'

function Header() {
    return (
        <header>
            <div className="navbar">
            <Link to='/'>BirdNerd II</Link>
            <ul>
                <li>
                    <Link to="/login"><FaSignInAlt />Login</Link>
                </li>
                <li>
                    <Link to="/register"><FaSignOutAlt />Register</Link>
                </li>
            </ul>
            </div>
        </header>
    );
}

export default Header;