import "./LoginForm.css";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import { useNavigate } from "react-router-dom";


const API_URL = import.meta.env.VITE_API_URL;

function LoginForm() {
  const { authenticateUser } = useContext(AuthContext);
  
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  
  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let responseStatus;

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        responseStatus = response.status;
        return response.json()
      })
      .then((response) => { 
        if (responseStatus === 200){
          localStorage.setItem("authToken", response.authToken);
          authenticateUser();
          navigate("/dashboard");
        } else if (responseStatus === 401) {
            setErrorMessage(response.message);
          }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("There was an error. Please try again later.");
      });
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
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
        <button type="submit"> Log in </button>
        {errorMessage && <p className="error">❌ {errorMessage}</p>}
      </form>
    </>
  );
}

export default LoginForm;