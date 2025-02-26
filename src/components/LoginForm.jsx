import "./LoginForm.css";
import { useState, useContext, useEffect } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");
  
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
        response.json()
      })
      .then((response) => { 
        if (responseStatus === 200){
          localStorage.setItem("authToken", response.authToken);
        }
      })
      .then(() => {
        //redirect user to the dashboard
        authenticateUser();

        if (responseStatus === 200) {
          navigate("/dashboard");
        } else if (responseStatus === 401) {
          setErrorMessage("Invalid username password combination");
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("There was an error. Try again later.");
      });
    }
    
    useEffect(() => {
      authenticateUser();
    }, []);

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      
  
      {!errorMessage &&  <form onSubmit={handleSubmit} className="form">
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
      </form>
      }
    </>
   
  );
}

export default LoginForm;