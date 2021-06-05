import React from 'react';
import {Link, withRouter} from 'react-router-dom';

function NavBar(){

    const navStyle = {
        color: 'black'
    }

    return(
        <nav>
            <h1 className="title">Simple Study</h1>
            <ul className="nav-links">
                <li>
                    <Link style={navStyle} to="/login">LogIn</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/signup">SignUp</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;