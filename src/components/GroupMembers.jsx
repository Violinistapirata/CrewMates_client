//CSS
import "./GroupMembers.css";
import "../pages/GroupSettingsPage.css";
import "./UpdateGroupForm.css";
import flagIcon from "../assets/crew-mates-logo-cropped.png"

//React
import { useEffect, useState } from "react";

//Variables
const API_URL = import.meta.env.VITE_API_URL;

function GroupMembers({ groupId, setAssigneeFilter, numberOfTasks }) {
  const storedToken = localStorage.getItem("authToken");
  const [members, setMembers] = useState(null);
  const [groupName, setGroupName] = useState(null);

  const [selectedFilter, setSelectedFilter] = useState(null); //we use the state on the clicked icons of the members or the group (when we click on them we trigger the filter of tasks)
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
        setMembers(groupInfo.members);
        setGroupName(groupInfo.name);
      })
      .catch((error) => {
        console.error("Error while getting group info ->", error);
      });
  }, [groupId, storedToken]);

  const handleGroupClick = () => {
    setAssigneeFilter({ label: "the whole crew", id: "all" });
    setSelectedFilter("group"); 
  };

  const handleMemberClick = (member) => {
    setAssigneeFilter({ label: member.name, id: member._id });
    setSelectedFilter(member._id); 
  };

  return (
    members && (
      <>
      
      
      <div className="group-header">
        
        <div 
          className={`GroupMembers-icon ${selectedFilter === "group" ? "active" : ""}`}
          onClick={handleGroupClick}>
          <img src={flagIcon} alt="Filter tasks by group" className="GroupMembers-filter-icon" />
        </div>
          <div>
            <h2 className="GroupMembers-name">{groupName ? `Crew of ${groupName}` : "Crew"}</h2>
            <p> Number of tasks: {`${numberOfTasks}`}</p>
          </div>
      </div>
      <h2 className="crewmates-header">Your crewmates</h2>
            <ul className="section__list section__list--row">
      
              {members.length > 0 ? (
                members.map((member) => {
                  return <li key={member._id} className="list-item" onClick={() => handleMemberClick(member)}>
                  <div className="list-item__container list-item__container--column">
                        <div className={`list-item__user-image ${
                        selectedFilter === member._id ? "active" : ""
                      }`}>
                          {member.name[0]}
                        </div>
                        <p className="list-item__name">{member.name.slice(0,3).toUpperCase()}</p>
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
