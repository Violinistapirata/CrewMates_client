import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import homeIcon from "../assets/home-icon.png";
import loginIcon from "../assets/login-icon.png"
import logoutIcon from "../assets/logout-icon.png"

function Navbar() {
    const {isLoggedIn, logOutUser} = useContext(AuthContext)

    return(
        <nav className="navbar">
            <ul className = "navbar__links">
                <li><NavLink to="/"><img src={homeIcon} alt="Home" className="nav-icon"/>Home</NavLink></li>
                {
                !isLoggedIn ? (<li><NavLink to="/sign-up"><img src={loginIcon} alt="Start Session" className="nav-icon" />Start Session</NavLink></li>) 
                            : (<li><button onClick={logOutUser}><img src={logoutIcon} alt="Log Out" className="nav-icon" />Log Out</button></li>) //NavLink and handleLogout function?
                }
            </ul>
        </nav>
    )
}

export default Navbar;