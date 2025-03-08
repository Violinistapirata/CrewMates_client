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

    if(groupCode.length===0){
      setErrorMessage("You need to provide a valid group code");
      setRequestIsSent(false);
    } else {

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
         if (response.status === 400) {
           console.error("Not a valid group code");
           setErrorMessage("Not a valid group code");
           setRequestIsSent(false);
         }
      })
      .catch((error) => {
        console.error("Error while updating the group ->", error);
        setErrorMessage("Something went wrong! Please try again later.");
        setRequestIsSent(false);
      });
    }
  }

  return (
    <div className="GroupAssignement">
      <h2 className="GroupAssignement-title"> Join an existing group </h2>
      <p>
        If there is an existing group, ask one of the members for the group
        code. They can find it in the group settings.
      </p>
      <form onSubmit={handleSubmit} className="GroupAssignment__form">
      <label htmlFor="group-code">Enter group code:</label>
        <div className="GroupAssignment__form-input-and-button">
          <input
            type="text"
            id="group-code"
            name="group-code"
            onChange={handleOnChange}
            value={groupCode}
          />
          {!requestIsSent ? (
            <button type="submit" className="joint-button">
              Join
            </button>
          ) : (
            <button type="submit" className="joint-button" disabled>
              Joining...
            </button>
          )}
        </div>
      </form>
      {errorMessage && <p>❌ {errorMessage}</p>}
    </div>
  );
}

export default GroupAssignment;
