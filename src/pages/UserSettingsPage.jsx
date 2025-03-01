//import hooks, context and css

import "./UserSettingsPage.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import UpdateUserForm from "../components/UpdateUserForm.jsx";
//API URL
const API_URL = import.meta.env.VITE_API_URL;

function UserSettingsPage() {
  const { userInfo } = useContext(AuthContext);
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
        //handling the response from the API

        .then((response) => response.json())
        .then((data) => {
          console.log("This is the data", data);
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
    userInfo && getUserGroupName();
  }, [userInfo]);

  return (

    <div className="user-settings">
      <h2>MY PROFILE</h2>
      {isEditing ? (<UpdateUserForm setIsEditing={setIsEditing}/> ): (
        

      <div className="user-email">
        {userInfo ? (
          <>
            <h3>Name</h3>
            <p>{userInfo.name}</p>
            <h3>Email</h3>
            <p>{userInfo.email}</p>
            <h3>Group</h3>
            <p>{userGroupInfo.name}</p>
            <button onClick={()=>setIsEditing(true)}>Edir User Info</button>
            
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      )}
    </div>
  );
}

export default UserSettingsPage;
