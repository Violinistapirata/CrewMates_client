import "./DashboardPage.css";
import "../components/GroupAssignment.jsx";
import "../components/GroupCreation.jsx";
import "../components/GroupMembers.jsx";
import "../components/WeekTasks.jsx";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import GroupAssignment from "../components/GroupAssignment.jsx";
import GroupCreation from "../components/GroupCreation.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const storedToken = localStorage.getItem("authToken");
  const { userInfo } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    if (userInfo) {
      fetch(`${API_URL}/api/users/${userInfo._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => {
          console.log("response fetch ", response);
          return response.json();
        })
        .then((data) => setGroup(data.group))
        .catch((error) => {
          console.error("Error while checking the group ->", error);
        });
    }
  }, [userInfo]);

  if (!group) {
    return (
      <>
        <h1>Welcome to crewmates!</h1>
        <p>Let's get started</p>
        <GroupAssignment />
        <GroupCreation />
      </>
    );
  }
}
export default DashboardPage;
