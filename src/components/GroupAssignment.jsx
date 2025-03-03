import "./GroupAssignment.css";
import { useState, useContext } from "react";

import Button from "./Button.jsx";
import { AuthContext } from "../context/auth.context.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function GroupAssignment() {
  const [groupCode, setGroupCode] = useState("");
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [requestIsSent, setRequestIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  function handleOnChange(e) {
    setGroupCode(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setRequestIsSent(true);
    fetch(`${API_URL}/api/groups/join/${groupCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({ newMember: userInfo._id }),
    })
      .then((response) => {
        if (response.status === 200) {
          setUserInfo({ ...userInfo, group: groupCode });
          setErrorMessage(null);
          response.json();
        }
        if (response.status === 500) {
          console.error("Error 500 while updating the group");
          setErrorMessage("Something went wrong. Please try again later.");
          setRequestIsSent(false);
        }
      })
      .catch((error) => {
        console.error("Error while updating the group ->", error);
        setErrorMessage("Something went wrong! Please try again later.");
        setRequestIsSent(false);
      });
  }

  return (
    <div className="DashboardPage__section">
      <h2 className="DashboardPage__section-title"> Join an existing group </h2>
      <p>
        If there is an existing group, ask one of the members for the group
        code. They can find it in the group settings.
      </p>
      <form onSubmit={handleSubmit} className="GroupAssignment__form">
        <label htmlFor="group-code">Enter group code:</label>
        <input
          type="text"
          name="group-code"
          onChange={handleOnChange}
          value={groupCode}
        />
        {!requestIsSent ? (
          <Button>Join group</Button>
        ) : (
          <Button>Request sent</Button>
        )}
      </form>
      {errorMessage && <p>❌ {errorMessage}</p>}
    </div>
  );
}

export default GroupAssignment;
