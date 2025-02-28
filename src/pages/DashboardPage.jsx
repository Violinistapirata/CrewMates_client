import "./DashboardPage.css";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function DashboardPage() {
    const [groupCode, setGroupCode] = useState("");
    const [requestIsSent, setRequestIsSent] = useState(false)
    /* function handleOnChange(e) {
        setGroupCode(e.target.value);
    } */

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Join group form submitted");
        setRequestIsSent(true);
        fetch(`${API_URL}/group/${groupCode}`, {method: "PUT", headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({members: userId})})
        .then((response) => response.json())
        .catch((error) => {
            console.error("Error while updating the group ->", error);
          });
        
        }

     
    
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

export default DashboardPage;