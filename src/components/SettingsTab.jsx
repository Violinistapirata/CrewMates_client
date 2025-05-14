import "./Navbar.css";
import { NavLink } from "react-router-dom";
import settingsIcon from "../assets/settings-icon-dark.png";

function SettingsTab({chosenSettingsPage, setChosenSettingsPage, showSettingsDropDown, setShowSettingsDropDown, userInfo}) {
    const dinamicId = chosenSettingsPage === "users" ? userInfo._id : userInfo.group;

    return(

        <li>
        {chosenSettingsPage ?
                <NavLink
                    to={`/settings/${chosenSettingsPage}/${dinamicId}`}
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
                  <span className="nav-text">{userInfo.name ? userInfo.name : "No name available"}</span>
                </NavLink>
                :
                <NavLink
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
                  <span className="nav-text">{userInfo.name ? userInfo.name : "No name available"}</span>
                </NavLink>

        }
                {showSettingsDropDown && userInfo.group && (
                  <div className="drop-down">
                    <NavLink to={`/settings/users/${userInfo._id}`} activeClassName="active">
                      <button
                        onClick={() => {
                          setChosenSettingsPage("users");
                          setShowSettingsDropDown(false);
                        }}
                        className="drop-down__button"
                      >
                        User Settings
                      </button>
                    </NavLink>
                    <NavLink to={`/settings/groups/${userInfo.group}`} activeClassName="active">
                      <button
                        onClick={() => {
                          setChosenSettingsPage("groups");
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
    )
}

export default SettingsTab