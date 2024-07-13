
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedical} from "@fortawesome/free-solid-svg-icons";

import '../styles/Nav.css';


function NavBar(){
    return(
   <nav className="nav">
    <div className="logo">
    <FontAwesomeIcon icon={faHouseMedical} size="lg" />
        <h1>MediCare+</h1>
    </div>
    <ul>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/register">Register</NavLink>
        </li>
        <li>
            <NavLink to="/login">Login</NavLink>
        </li>
       
    </ul>
    </nav>
    )
}

export default NavBar
