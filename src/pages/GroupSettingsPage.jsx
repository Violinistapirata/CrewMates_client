import "./GroupSettingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function GroupSettingsPage() {
  const { userInfo } = useContext(AuthContext);
  const [userGroupInfo, setUserGroupInfo] = useState({name: "", members:[], recurringTasks: []});

  console.log(userInfo);
  if (userInfo.group) {
    console.log("THIS IS userInfo.group: ", userInfo.group);
  }
  function getUserGroupInfo() {
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
          console.log("THIS IS THE GROUP INFO: ", data);
          setUserGroupInfo(data);
        })
        .catch((err) => {
          console.error("Error occurred", err);
        });
    }
  }
  useEffect(() => {
    getUserGroupInfo();
  }, []);

  userGroupInfo && console.log("THIS IS userGroupInfo: ", userGroupInfo);
  const { name, members, recurringTasks } = userGroupInfo;

  userGroupInfo &&
    console.log("data from userGroupInfo: ", name, members, recurringTasks);

  return (
    <>
      <h2> Group settings</h2>

      <h3>Group name</h3>
      <p>{name ? name : "You don't have a group yet :( "}</p>
      <h3>My crewmates</h3>
      <ul>
        {members &&
          members.map((member, index) => {
            return <li key={members[index]}>{member}</li>;
          })}
      </ul>

      <h3>Recurring tasks</h3>
      <ul>
        {recurringTasks &&
          recurringTasks.map((task, index) => {
            return <li key={recurringTasks[index]}>{task}</li>;
          })}
      </ul>
    </>
  );
  // })
}

export default GroupSettingsPage;
