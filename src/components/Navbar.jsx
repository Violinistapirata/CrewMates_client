import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import homeIcon from "../assets/home-icon.png";
import loginIcon from "../assets/login-icon.png";
import logoutIcon from "../assets/logout-icon.png";
import settingsIcon from "../assets/settings-icon.png";
import dashboardIcon from "../assets/dashboard-icon.png";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const [showSettingsDropDown, setShowSettingsDropDown] = useState(false);
  const [chosenSettingsPage, setChosenSettingsPage] = useState("");

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li>
          <NavLink
            to="/"
            activeClassName="active"
            onClick={() => {
              setShowSettingsDropDown(false);
              setChosenSettingsPage("");
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
                    setChosenSettingsPage("");
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
                    logOutUser;
                    setChosenSettingsPage("");
                    setShowSettingsDropDown(false);
                  }}
                >
                  <img src={logoutIcon} alt="Log Out" className="nav-icon" />
                  Log Out
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={
                    chosenSettingsPage === "user"
                      ? "/settings/users/aaa"
                      : chosenSettingsPage === "group"
                      ? "/settings/groups/aaa"
                      : null
                  }
                  activeClassName="active"
                  onClick={() => {
                    setShowSettingsDropDown(!showSettingsDropDown);
                    setChosenSettingsPage("");
                  }}
                >
                  <img
                    src={settingsIcon}
                    alt="settings-icon"
                    className="nav-icon nav-icon__drop-down"
                  />
                  Settings
                </NavLink>
                {showSettingsDropDown && (
                  <div className="drop-down">
                    <NavLink to="/settings/users/aaa" activeClassName="active">
                      <button
                        onClick={() => {
                          setChosenSettingsPage("user");
                          setShowSettingsDropDown(false);
                        }}
                        className="drop-down__button"
                      >
                        User Settings
                      </button>
                    </NavLink>
                    <NavLink to="/settings/groups/aaa" activeClassName="active">
                      <button
                        onClick={() => {
                          setChosenSettingsPage("group");
                          setShowSettingsDropDown(false);
                        }}
                        className="drop-down__button"
                      >
                        Group Settings
                      </button>
                    </NavLink>
                  </div>
                )}
              </li>
            </>
          ) //NavLink and handleLogout function?
        }
      </ul>
    </nav>
  );
}

export default Navbar;
