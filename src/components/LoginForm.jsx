import "./LoginForm.css";
import { useState } from "react";

//import useContext
//import { useNavigate } from "react-router-dom";
//import auth context
const API_URL = import.meta.env.VITE_API_URL;

function LoginForm(){
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    //const [errorMessaage, setErrorMessage] = useState("");
    //const { storeToken, authenticateUser } = useContext(AuthContext);
    //const navigate = useNavigate();

    function handleSubmit(e) {
      e.preventDefault();
      console.log("Login form submitted");
      
      fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((response) => {
          localStorage.setItem("authToken", response.data.authToken);
          console.log(response);
          setFormData({
            email: "",
            password: "",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    function handleOnChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      console.log(e.target.name);
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

       <button type="submit"> Create new user </button>
     </form>
   );
}

export default LoginForm;