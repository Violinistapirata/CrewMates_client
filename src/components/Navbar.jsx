import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    const {isLoggedIn, logOutUser} = useContext(AuthContext)

    return(
        <nav className="navbar">
            <ul className = "navbar__links">
                <li><NavLink to="/">Home</NavLink></li>
                {
                !isLoggedIn ? (<li><NavLink to="/sign-up">Start Session</NavLink></li>) 
                            : (<li><button onClick={logOutUser}>Log Out</button></li>)
                }
            </ul>
        </nav>
    )
}

export default Navbar;