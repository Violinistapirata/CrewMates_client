import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import SettingsTab from "./SettingsTab";
import homeIcon from "../assets/home-icon.png";
import loginIcon from "../assets/login-icon.png";
import logoutIcon from "../assets/logout-icon.png";
import dashboardIcon from "../assets/dashboard-icon.png";

function Navbar() {
  const { isLoggedIn, logOutUser, userInfo } = useContext(AuthContext);
  const [showSettingsDropDown, setShowSettingsDropDown] = useState(false);
  const [chosenSettingsPage, setChosenSettingsPage] = useState(null);

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li>
          <NavLink
            to="/"
            activeClassName="active"
            onClick={() => {
              setShowSettingsDropDown(false);
              setChosenSettingsPage("users");
            }}
          >
            <img src={homeIcon} alt="Home" className="nav-icon" />
            Home
          </NavLink>
        </li>
        {
          !isLoggedIn ? (
            <li>
              <NavLink to="/sign-up" activeClassName="active">
                <img src={loginIcon} alt="Start Session" className="nav-icon" />
                Start Session
              </NavLink>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard"
                  activeClassName="active"
                  onClick={() => {
                    setShowSettingsDropDown(false);
                    setChosenSettingsPage("users");
                  }}
                >
                  <img
                    src={dashboardIcon}
                    alt="Dashboard"
                    className="nav-icon"
                  />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sign-up"
                  activeClassName="active"
                  onClick={() => {
                    logOutUser();
                    setChosenSettingsPage("users");
                    setShowSettingsDropDown(false);
                  }}
                >
                  <img src={logoutIcon} alt="Log Out" className="nav-icon" />
                  Log Out
                </NavLink>
              </li>
                <SettingsTab 
                chosenSettingsPage={chosenSettingsPage} 
                setChosenSettingsPage={setChosenSettingsPage} 
                showSettingsDropDown={showSettingsDropDown} 
                setShowSettingsDropDown={setShowSettingsDropDown}
                userInfo={userInfo}
                />
            </>
          )
        }
      </ul>
    </nav>
  );
}

export default Navbar;
