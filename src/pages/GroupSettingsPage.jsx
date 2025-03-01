import "./GroupSettingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import UpdateGroupForm from "../components/UpdateGroupForm";

const API_URL = import.meta.env.VITE_API_URL;

function GroupSettingsPage() {
  const { userInfo } = useContext(AuthContext);
  const [userGroupInfo, setUserGroupInfo] = useState({
    name: null,
    members: null,
    recurringTasks: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState();
  console.log("USER INFO:", userInfo);
  if (userInfo) {
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
    userInfo && getUserGroupInfo();
  }, [userInfo]);

  userGroupInfo && console.log("THIS IS userGroupInfo: ", userGroupInfo);
  const { name, members, recurringTasks } = userGroupInfo;

  userGroupInfo &&
    console.log("data from userGroupInfo: ", name, members, recurringTasks);

  return (
    <div className="flex-container">
      <h2 className="title"> Group settings</h2>
      {isEditing ? (
        <UpdateGroupForm />
      ) : (
        <>
          <section className="section">
            <h3 className="section__title">Group name</h3>
            <p className="section__text">
              {name ? name : "You don't have a group yet :( "}
            </p>
          </section>

          <section className="section">
            <h3 className="section__title">My crewmates</h3>
            <ul className="section__list">
              {members ? (
                members.map((member) => {
                  return <li key={member._id}>{member.name}</li>;
                })
              ) : (
                <p>No members in this group</p>
              )}
            </ul>
          </section>

          <section className="section">
            <h3 className="section__title">Recurring tasks</h3>
            <ul className="section__list">
              {recurringTasks ? (
                recurringTasks.map((task, index) => {
                  return <li key={recurringTasks[index]}>{task}</li>;
                })
              ) : (
                <p>No recurring tasks in this group</p>
              )}
            </ul>
          </section>
          <button onClick={() => setIsEditing(true)}>Edit Group Info</button>
        </>
      )}
    </div>
  );
  // })
}

export default GroupSettingsPage;
