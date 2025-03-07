//CSS
import "./GroupMembers.css";
import "../pages/GroupSettingsPage.css";
import "./UpdateGroupForm.css";

//React
import { useEffect, useState } from "react";

//Variables
const API_URL = import.meta.env.VITE_API_URL;

function GroupMembers({ groupId, setAssigneeFilter }) {
  const storedToken = localStorage.getItem("authToken");
  const [members, setMembers] = useState(null);
  const [groupName, setGroupName] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/groups/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((groupInfo) => {
        console.log(groupInfo.members);
        setMembers(groupInfo.members);
        setGroupName(groupInfo.name);
      })
      .catch((error) => {
        console.error("Error while getting group info ->", error);
      });
  }, []);

  return (
    members && (
      <>
        <h2>Your crewmates</h2>
        <div 
            className="GroupMembers-icon" 
            onClick={()=>setAssigneeFilter({label: "the whole crew", id: "all"})}
        >{groupName ? `Crew of ${groupName}` : "Crew"}</div>

            <ul className="section__list section__list--row">
      
              {members.length > 0 ? (
                members.map((member) => {
                  return <li key={member._id} className="list-item" onClick={()=>setAssigneeFilter({label: member.name, id: member._id})}>
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
{/*         {members.map((member) => {
          return (
              <li key={member._id}>
                <div onClick={() => setFilter({label: member.name, id: member._id})}>
                  {member.name.slice(0, 3).toUpperCase()}
                </div>
              </li>
          );
        })} */}
      </>
    )
  );
}
export default GroupMembers;
