//CSS
import "./GroupMembers.css";

//React
import { useEffect, useState } from "react";

//Variables
const API_URL = import.meta.env.VITE_API_URL;

function GroupMembers({ groupId, setFilter }) {
  const storedToken = localStorage.getItem("authToken");
  const [members, setMembers] = useState(null);

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
      })
      .catch((error) => {
        console.error("Error while getting group info ->", error);
      });
  }, []);

  return (
    members && (
      <>
        <div className="GroupMembers-icon">All</div>
        {members.map((member) => {
          return (
            <>
              <li key={member._id}>
                <div onClick={() => setFilter({label: member.name, id: member._id})}>
                  {member.name.slice(0, 3).toUpperCase()}
                </div>
              </li>
            </>
          );
        })}
      </>
    )
  );
}
export default GroupMembers;
