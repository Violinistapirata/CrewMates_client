import "./updateGroupForm.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function UpdateGroupForm() {
  const [formData, setFormData] = useState({
    groupName: "",
    groupMembers: [],
    groupTasks: []
  });

  const [errorMessage, setErrorMessage] = useState(null);
  
  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // fetch(`${API_URL}/auth/login`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    })
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          name="groupName"
          onChange={handleOnChange}
          value={formData.groupName}
        />
  
        <label htmlFor="groupTasks">Tasks</label>
        <input
          type="text"
          name="groupTasks"
          onChange={handleOnChange}
          value={formData.groupTasks}
        />
        <button type="submit"> Save changes </button>
        {errorMessage && <p className="error">❌ {errorMessage}</p>}
      </form>
    </>
  );
}

export default UpdateGroupForm;