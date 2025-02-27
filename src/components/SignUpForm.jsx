import "./SignUpForm.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const[errorMessage, setErrorMessage] = useState(null);
  const[successMessage, setSuccessMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    let responseStatus;

    fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((response) => {
        responseStatus = response.status;
        return response.json()
      }).then((response) => { 
        if (responseStatus === 201){
          setFormData({
            name: "",
            email: "",
            password: "",
          });
          setSuccessMessage(
            `Your signup was successful. You can now log in.`
          );
          setErrorMessage(null);
        } else if (responseStatus === 400) {
          setErrorMessage(response.message);
          setSuccessMessage(null);
        }
      }).catch ((error) => {
      console.error(error);
      })
  }
  
  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

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

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleOnChange}
          value={formData.password}
        />

        <button type="submit"> Create new user </button>
      {successMessage && <p className="success">✅ {successMessage}</p>}
      {errorMessage && <p className="error">❌ {errorMessage}</p>}
      </form>
    </>
  );
}

export default SignUpForm;
