//import hooks, context and css

import "./UserSettingsPage.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import UpdateUserForm from "../components/UpdateUserForm.jsx";
import NotLoggedIn from "../components/NotLoggedIn.jsx";

//API URL
const API_URL = import.meta.env.VITE_API_URL;

function UserSettingsPage() {
  const { userInfo, isLoggedIn } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userGroupInfo, setUserGroupInfo] = useState({
    name: "",
  });

  console.log(userInfo);

  // function to get the group info from database
  function getUserGroupName() {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      fetch(`${API_URL}/api/groups/${userInfo.group}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserGroupInfo({
            name: data.name,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  //useEffect to get the group name
  useEffect(() => {
    userInfo && userInfo.group && getUserGroupName();
  }, [userInfo]);

  return (
    <>
      {isLoggedIn && (
        <div className="user-settings-container">
          <h2 className="user-settings-title">User Info</h2>
          {isEditing ? (
            <UpdateUserForm setIsEditing={setIsEditing} userInfo={userInfo} />
          ) : (
            <>
              <section className="user-settings-section">
                <h3 className="user-settings-section__title">Name</h3>
                <p className="user-settings-section__text">
                  {userInfo.name ? userInfo.name : "No name available"}
                </p>
              </section>

              <section className="user-settings-section">
                <h3 className="user-settings-section__title">Email</h3>
                <p className="user-settings-section__text">
                  {userInfo.email ? userInfo.email : "No email available"}
                </p>
              </section>

              <section className="user-settings-section">
                <h3 className="user-settings-section__title">Group</h3>
                <p className="user-settings-section__text">
                  {userGroupInfo.name ? userGroupInfo.name : "No group available"}
                </p>
              </section>

              {/* <button className="user-settings-button" onClick={() => setIsEditing(true)}>Edit User Info</button> */}
            </>
          )}
        </div>
      )}
      {!isLoggedIn && <NotLoggedIn />}
    </>
  );
}

export default UserSettingsPage;