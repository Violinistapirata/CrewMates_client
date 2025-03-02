//CSS
import "./DashboardPage.css";

//Components
import GroupAssignment from "../components/GroupAssignment.jsx";
import GroupCreation from "../components/GroupCreation.jsx";
import GroupMembers from "../components/GroupMembers.jsx";
import WeekTasks from "../components/WeekTasks.jsx";

//React
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { Link, useNavigate } from "react-router-dom";

//Functions
import { getCurrentDate } from "../utils/helperFunctions.js";

//Variables
const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
  const navigate = useNavigate(); 
  const storedToken = localStorage.getItem("authToken");
  const { userInfo } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [group, setGroup] = useState(null);
  const [hasRecurringTasks, setHasRecurringTasks] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [filter, setFilter] = useState({
    label: "the whole crew",
    id: "all",
  });
  /* const [hasActiveWeek, setHasActiveWeek] = useState(false); */
  //Remove from here and from backend response?

  useEffect(() => {
    //Get user info to check which is their group, if any
    //The Context is lost as soon as the page is refreshed.
    //With this we can recover the Context information through the token.
    if (userInfo) {
      setIsLoading(true);
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
          const currentDate = getCurrentDate();

          groupId &&
            fetch(`${API_URL}/api/week/${groupId}/${currentDate}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
              },
            }).then((response) => {
                return response.json();
            }).then((weekStatus) => {
                setHasRecurringTasks(weekStatus.hasRecurringTasks);
                //setHasActiveWeek(weekStatus.hasActiveWeek); //REMOVE
                setTasks(weekStatus.tasks);
                console.log("data", weekStatus.tasks);
            });
          }).then(() => {
          setIsLoading(false);
          }).catch((error) => {
          console.error("Error while checking the group ->", error);
        });
    }
  }, [userInfo]);

  return (
    <>
      {!isLoggedIn && (
        <p>
          {" "}
          🚫You're currently not logged in. <br />
          Please {" "}
          <Link to={`/sign-up`}>log in</Link> to view this page.{" "}
        </p>
      )}
      {isLoading && (
        <>
          <p>
            🦜🦜🦜
            <br />
            LOADING....
            <br />
            🦜🦜🦜
          </p>
        </>
      )}

      {isLoggedIn && !isLoading && !group && (
        <>
          <h1>Welcome to crewmates!</h1>
          <p>Let's get started</p>
          <GroupAssignment />
          <GroupCreation />
        </>
      )}

      {isLoggedIn && !isLoading && group && tasks && (
        <>
          <h1>Welcome on board</h1>
          <GroupMembers groupId={group} setFilter={setFilter} />
          <WeekTasks tasks={tasks} filter={filter} />
        </>
      )}

      {isLoggedIn && !isLoading && group && !tasks && hasRecurringTasks && (
        <>
          <h1>Welcome on board!</h1>
          <GroupMembers groupId={group} />
          <button>Create new week</button>
        </>
      )}

      {isLoggedIn && !isLoading && group && !tasks && !hasRecurringTasks && (
        <>
          <h1>Welcome on board!</h1>
          <GroupMembers groupId={group} />
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
