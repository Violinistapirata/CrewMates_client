import "./LoginForm.css";
import { useState, useContext } from "react";
import { AuthContext } from '../context/auth.context.jsx'
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
function LoginForm(){
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { group, authenticateUser } = useContext(AuthContext);
  //const {user} = useContext(AuthContext);

  //const [errorMessaage, setErrorMessage] = useState("");
    //const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
      e.preventDefault();
      
      fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(response => response.json())
      .then((response) => {
          localStorage.setItem("authToken", response.authToken);
          setFormData({
            email: "",
            password: "",
          });
          //redirect user to homepage
        })
        .then(() => {
          authenticateUser();
           navigate("/dashboard");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function handleOnChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
   
   return (
     <form onSubmit={handleSubmit} className="form">

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
   );
}

export default LoginForm;