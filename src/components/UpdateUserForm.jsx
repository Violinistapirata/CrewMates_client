// import { useState, useContext, useEffect } from "react";


import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import "./UpdateUserForm.css";
// API URL

const API_URL = import.meta.env.VITE_API_URL;

function UpdateUserForm({setIsEditing}) {
  const { authenticateUser, userInfo } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: userInfo.email || "",
    name: userInfo.name || "",
    group: userInfo.group || "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    setIsEditing(false);
    // fetch to update the user info 
    
      fetch(`${API_URL}/api/users/${userInfo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
       },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
         setSuccessMessage("User updated successfully!");
          setErrorMessage(null);
          authenticateUser(); 

          // Use data to update the user info 

          setFormData({
            email: data.email,
            name: data.name,
            group: data.group,
          });
        })
        .catch((error) => {
          setErrorMessage(`Error updating user: ${error.message}`);
          setSuccessMessage(null);
        });
   }
  // useEffect to update the form data when the user info changes

  useEffect(() => {
    if (userInfo) {
      setFormData({
        email: userInfo.email,
        name: userInfo.name,
        group: userInfo.group,
      });
    }
  }, [userInfo]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">User Name</label>
        <input
          type="text"
          name="name"
          onChange={handleOnChange}
          value={formData.name}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleOnChange}
          value={formData.email}
        />

        <label htmlFor="group">Group</label>
        <input
          type="text"
          name="group"
          onChange={handleOnChange}
          value={formData.group}
        />

        <button type="submit">Update User</button>
        {errorMessage && <p className="error">❌ {errorMessage}</p>}
        {successMessage && <p className="success">✅ {successMessage}</p>}
      </form>
    </>
  );
}

export default UpdateUserForm;