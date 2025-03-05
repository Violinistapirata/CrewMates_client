import "./GroupSettingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import UpdateGroupForm from "../components/UpdateGroupForm";
import NotLoggedIn from "../components/NotLoggedIn"
import Button from "../components/Button";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function GroupSettingsPage() {
  const { userInfo, isLoggedIn } = useContext(AuthContext);
  const [userGroupInfo, setUserGroupInfo] = useState({
    name: "",
    members: [],
    recurringTasks: [],
  });

  const {_id: groupId, name, members, recurringTasks } = userGroupInfo;

  const [isEditing, setIsEditing] = useState(false);
  
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`
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
    userInfo && userInfo.group && getUserGroupInfo();
  }, [userInfo]);

  userGroupInfo && console.log("THIS IS userGroupInfo: ", userGroupInfo);
  

  userGroupInfo &&  
    console.log("data from userGroupInfo: ", name, members, recurringTasks);

  return (
    <>

    {isLoggedIn && userGroupInfo.members.length > 0 ? (
    <div className="flex-container">
      <h2 className="title"> Group settings</h2>
      {isEditing ? (
        <UpdateGroupForm setIsEditing={setIsEditing} userGroupInfo={userGroupInfo} setUserGroupInfo={setUserGroupInfo}/>
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
            <ul className="section__list section__list--row">
              {members.length > 0 ? (
                members.map((member) => {
                  return <li key={member._id} className="list-item ">
                  <div className="list-item__container list-item__container--column">
                        <div className="list-item__user-image">
                          {member.name[0]}
                        </div>
                        <p className="list-item__name">{member.name}</p>
                      </div>
                  </li>;
                })
              ) : (
                <p>No members in this group</p>
              )}
            </ul>
            <div className="cta">
            <h4 className="cta__title">Embarking Code</h4>
            <p className="cta__text">Send this code to your crew mates to invite them to join your crew!</p>
            <p className="cta__code">{groupId}</p>
          </div>
          </section>

          <section className="section">
            <h3 className="section__title">Recurring tasks</h3>
            <ul className="section__list">
              {recurringTasks.length > 0 ? (
                recurringTasks.map((task, index) => {
                  return <li key={recurringTasks[index]}>{task}</li>;
                })
              ) : (
                <p>No recurring tasks in this group</p>
              )}
            </ul>
          </section>
          <Button type="button" onClick={() => setIsEditing(true)} content="Edit Group Info"/>
        </>
      )}
    </div>
    ) : (
      <section className="section">
            <h3 className="section__title">{"You don't have a group!"}</h3>
            <p className="section__text">
            Please, go to {<Link to="/dashboard">Dashboard</Link>} to join a group or create one.
            </p>
          </section>
    )}  
    {!isLoggedIn && <NotLoggedIn/>} 
    </>
  );
  
}

export default GroupSettingsPage;
