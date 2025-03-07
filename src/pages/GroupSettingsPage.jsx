import "./GroupSettingsPage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import UpdateGroupForm from "../components/UpdateGroupForm";
import NotLoggedIn from "../components/NotLoggedIn";
import Button from "../components/Button";
import copyIcon from "../assets/content_copy.svg";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function GroupSettingsPage() {
  const { userInfo, setUserInfo, isLoggedIn } = useContext(AuthContext);
  const [userGroupInfo, setUserGroupInfo] = useState({
    name: "",
    members: [],
    recurringTasks: [],
  });
  const { _id: groupId, name, members, recurringTasks } = userGroupInfo;
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function getUserGroupInfo() {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      fetch(`${API_URL}/api/groups/${userInfo.group}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
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

  return (
    <>
      {isLoggedIn && userGroupInfo.members.length > 0 ? (
        <div className="GroupSettings">
          <h1> Group settings</h1>
          {isEditing ? (
            <UpdateGroupForm
              userId={userInfo._id}
              setUserInfo={setUserInfo}
              setIsEditing={setIsEditing}
              userGroupInfo={userGroupInfo}
              setUserGroupInfo={setUserGroupInfo}
            />
          ) : (
            <>
              <div className="GroupSettings__fields">
                <section className="GroupSettings__name">
                  <h2 className="GroupSettings__name">My ship&apos;s name</h2>
                  <p className="section__text">
                    {name ? name : "You don't have a group yet :( "}
                  </p>
                </section>
                <section className="GroupSettings__crewmates">
                  <h2 className="section__title">My crewmates</h2>
                  <ul className="GroupSettings__members-list">
                    {members.length > 0 ? (
                      members.map((member) => {
                        return (
                          <li key={member._id}>
                            <div className="list-item">
                              <div className="list-item__user-image">
                                {member.name[0]}
                              </div>
                              <p className="list-item__name">{member.name}</p>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <p>No members in this group</p>
                    )}
                  </ul>
                  <div className="GroupSettings__code">
                    <p className="code__title">Embarkation code:</p>

                    <div className="code-button-wrapper">
                      <p
                        className="code__code"
                        onClick={() => {
                          navigator.clipboard.writeText(groupId);
                        }}
                      >
                        {groupId}
                      </p>
                      <img
                        src={copyIcon}
                        alt="copy to clipboard"
                        onClick={() => {
                          navigator.clipboard.writeText(groupId);
                          setShowToast(true);
                          setTimeout(() => {
                            setShowToast(false);
                          }, 1500);
                        }}
                      />
                      {showToast && <p className="clipboard-toast">✅ Copied!</p>}
                    </div>
                  </div>
                  <p className="code__text">
                    Send this code to your flatmates to invite them to join your
                    crew. They need to sign up first!
                  </p>
                </section>
                <section className="section">
                  <h2 className="section__title">Recurring tasks</h2>
                  <ul className="GroupSettings__tasks">
                    {recurringTasks.length > 0 ? (
                      recurringTasks.map((task, index) => {
                        return <li key={recurringTasks[index]}>{task}</li>;
                      })
                    ) : (
                      <p>No recurring tasks in this group</p>
                    )}
                  </ul>
                </section>
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  content="Edit group"
                />
              </div>
            </>
          )}
        </div>
      ) : (
        isLoggedIn &&
        !userGroupInfo.members.length && (
          <section className="section">
            <h3 className="section__title">{"You don't have a group!"}</h3>
            <p className="section__text">
              Please, go to {<Link to="/dashboard">Dashboard</Link>} to join a
              group or create one.
            </p>
          </section>
        )
      )}
      {!isLoggedIn && <NotLoggedIn />}
    </>
  );
}

export default GroupSettingsPage;
