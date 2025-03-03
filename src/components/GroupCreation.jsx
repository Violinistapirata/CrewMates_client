import "./GroupCreation.css";
import { useState, useContext } from "react";

import Button from "./Button.jsx"
import { AuthContext } from "../context/auth.context.jsx";
const API_URL = import.meta.env.VITE_API_URL;


function GroupCreation() {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [requestIsSent, setRequestIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  function createGroup() {
    setRequestIsSent(true);

    fetch(`${API_URL}/api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 500) {
          console.error("Error 500 while updating the group");
          setErrorMessage("Something went wrong. Please try again later.");
          setRequestIsSent(false);
        }
      })
      .then((createdGroup) => {
        setUserInfo({ ...userInfo, group: createdGroup._id });
        setErrorMessage(null);
      })
      .catch((error) => {
        console.error("Error while updating the group ->", error);
        setErrorMessage("Something went wrong! Please try again later.");
        setRequestIsSent(false);
      });
  }

  return (
    <div className="DashboardPage__section">
      <h2 className="DashboardPage__section-title">Create a new group </h2>
      <p>
        Once your flatmates sign up, they can join your group using the code
        that you give them.
      </p>
      {!requestIsSent ? (
        <Button onClick={createGroup}>Create group</Button>
      ) : (
        <Button disabled>Create group</Button>
      )}
      {errorMessage && <p>❌ {errorMessage}</p>}
    </div>
  );
}

export default GroupCreation;
