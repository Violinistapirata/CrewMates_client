import "./SignUpForm.css";
import { useState } from "react";

function SignUpForm() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });


    function handleSubmit (e) {
        e.preventDefault();
        console.log("Sign Up form submitted");
        setFormData({
            name: "",
            email: "",
            password: ""
        });
    }

    function handleOnChange (e) {
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(e.target.name);
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="name">User Name</label>
            <input type="text" name="name" onChange={handleOnChange} value={formData.name}/>

            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleOnChange} value={formData.email}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleOnChange} value={formData.password}/>

            <button type="submit"> Create new user </button>
        </form>
    )
}

export default SignUpForm;