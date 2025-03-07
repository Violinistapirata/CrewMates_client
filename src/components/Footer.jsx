import "./Footer.css";
import { NavLink } from "react-router-dom";
import openInNewTab from "../assets/open_in_new_24dp.svg"

function Footer() {
    return (
      <footer className="Footer">
        <NavLink activeClassName="active" to="/about-us">
          About us
        </NavLink>
        <a
          href="https://github.com/Violinistapirata/final_project_client"
          target="blank"
        >
          Contribute to the project <img src={openInNewTab}></img>
        </a>
      </footer>
    );
}

export default Footer;