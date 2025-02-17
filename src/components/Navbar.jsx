import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
    return(
        <nav className="navbar">
            <ul className = "navbar__links">
                <li><Link to="/">Home</Link></li>
                <li><NavLink to="/">About us</NavLink></li>
                <li><NavLink to="/sign-up">Sign Up</NavLink></li>
                <li><NavLink to="/sign-up">Login</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;