import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import "./SignUpPage.css";

function SignUpPage() {
    const [signUpOrLogin, setSignUpOrLogin] = useState("login");
    return (
      <>
        <h1>Log in or Sign up</h1>
        <div>
          <button onClick={()=>setSignUpOrLogin("login")}>Log in</button>
          <button onClick={()=>setSignUpOrLogin("signup")}>Sign up</button>
        </div>
        {(signUpOrLogin === "login") && (
          <div className="container">
            <LoginForm />
          </div>
        )}
        {(signUpOrLogin === "signup") && (
          <div className="container">
            <SignUpForm />
          </div>
        )}
      </>
    );
}

export default SignUpPage;