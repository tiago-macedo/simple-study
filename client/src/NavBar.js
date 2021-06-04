import React from 'react';
import {Link} from 'react-router-dom';

function NavBar(){
    return(
        <nav>
            <h1 className="title">Simple Study</h1>
            <ul className="nav-links">
                <li>
                    <Link to="/">LogIn</Link>
                </li>
                <li>
                    <Link to="/signup">SignUp</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;