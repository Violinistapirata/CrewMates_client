import "./DashboardPage.css";
import "../components/GroupAssignment.jsx";
import "../components/GroupCreation.jsx";
import "../components/GroupMembers.jsx";
import "../components/WeekTasks.jsx";

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Link } from "react-router-dom";
import GroupAssignment from "../components/GroupAssignment.jsx";
import GroupCreation from "../components/GroupCreation.jsx";
import GroupMembers from "../components/GroupMembers.jsx";
import WeekTasks from "../components/WeekTasks.jsx";

import { getCurrentDate } from "../utils/helperFunctions.js";
const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const storedToken = localStorage.getItem("authToken");
  const { userInfo } = useContext(AuthContext);
  const [group, setGroup] = useState(null);
  const [hasRecurringTasks, setHasRecurringTasks] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [hasActiveWeek, setHasActiveWeek] = useState(false);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    userInfo && //with this we can recover the Context information. The Context is lost as soon as the page is refreshed.
      fetch(`${API_URL}/api/users/${userInfo._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((userInfo) => {
          setGroup(userInfo.group);
          return userInfo.group;
        })
        .then((groupId) => {
            console.log("groupId", groupId)
        const currentDate = getCurrentDate();
          {
            groupId &&
              fetch(`${API_URL}/api/week/${groupId}/${currentDate}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${storedToken}`,
                },
              })
                .then((response) => {
                  return response.json();
                })
                .then((weekStatus)=> {
                    setHasRecurringTasks(weekStatus.hasRecurringTasks);
                    setHasActiveWeek(weekStatus.hasActiveWeek);
                    setTasks(weekStatus.tasks);
                    console.log("data", weekStatus);
                });

          }
        })
        .catch((error) => {
          console.error("Error while checking the group ->", error);
        });
  }, [userInfo]);

  return (
    <>
      {!group && (
        <>
          <h1>Welcome to crewmates!</h1>
          <p>Let's get started</p>
          <GroupAssignment />
          <GroupCreation />
        </>
      )}

      {group && tasks && (
        <>
          <h1>Welcome on board</h1>
          <GroupMembers />
          <WeekTasks />
        </>
      )}

      {group && !tasks && hasRecurringTasks && (
        <>
          <h1>Welcome on board!</h1>
          <GroupMembers />
          <button>Create new week</button>
        </>
      )}

      {group && !tasks && !hasRecurringTasks && (
        <>
          <h1>Welcome on board!</h1>
          <GroupMembers />
          <p>
            {" "}
            Your group has no template to generate your tasks for the week.{" "}
            <br />
            Go to your{" "}
            <Link to={`/settings/groups/${group}`}>Group Settings</Link> to add
            tasks.{" "}
          </p>
        </>
      )}
    </>
  );
}
export default DashboardPage;
