import "./Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {
    return(
        <footer className="footer">
        <NavLink activeClassName="active" to="/about-us" >About us</NavLink>
        <a href="https://github.com/Violinistapirata/final_project_client" target="blank">Contribute to the project</a>
        </footer>
    )
}

export default Footer;