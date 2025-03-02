import "./GroupAssignment.css";
import { useState, useContext } from "react";
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
    <>
      <h3> Join an existing group </h3>
      <p>
        If there is an existing group, ask one of the members for the group
        code. They can find it in the group settings.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="group-code">Enter group code:</label>
        <input
          type="text"
          name="group-code"
          onChange={handleOnChange}
          value={groupCode}
        />
        {!requestIsSent ? (
          <button type="submit">Join group</button>
        ) : (
          <button type="submit" disabled>
            Request sent
          </button>
        )}
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default GroupAssignment;
