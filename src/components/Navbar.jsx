import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
    return(
        <nav className="navbar">
            <ul className = "navbar__links">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/sign-up">Sign Up</NavLink></li>
                <li><NavLink to="/sign-up">Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;