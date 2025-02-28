import "./DashboardPage.css";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
    const storedToken = localStorage.getItem("authToken");
    const {userInfo} = useContext(AuthContext);
    const [group, setGroup] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [members, setMembers] = useState(null);
    const [groupCode, setGroupCode] = useState("");
    const [requestIsSent, setRequestIsSent] = useState(false)
    /* function handleOnChange(e) {
        setGroupCode(e.target.value);
    } */

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Join group form submitted");
        setRequestIsSent(true);
        fetch(`${API_URL}/group/${groupCode}`, {method: "PUT", headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({members: userInfo._id})})
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error while updating the group ->", error);
          });
        
        }

/*     function findUserGroup() {
        fetch(`${API_URL}/:id`, 
    } */

    useEffect(() => {
        fetch(`${API_URL}/api/users/${userInfo._id}`, {method: "GET", headers:{ 'Content-Type': 'application/json', Authorization: `Bearer ${storedToken}` }})
        .then((response) => {
            console.log("response fetch ", response)
            return response.json();
        })
        .then((data) => setGroup(data.group))
        .catch((error) =>{
            console.error("Error while checking the group ->", error);
        })
    }, [])

    if(!group) { 
    return(
        
        <>

            <h3> Join an existing group </h3>
            <p>If there is an existing group, ask one of the members for the group code. They can find it in the group settings.</p>
            <form onSubmit = {handleSubmit}>
                <label htmlFor="group-code">Enter group code:</label>
                <input 
                    type="text"
                    name="group-code"
                    /*onChange = {handleOnChange}*/
                    value = {groupCode}
                     />
                <button type = "submit">Request to join group</button>
                {!requestIsSent ? <button type = "submit">Request to join group</button> : <button type = "submit">Request sent</button>}
            </form>
        </>
    )
}
}
export default DashboardPage;