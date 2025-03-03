import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import "./SignUpPage.css";

function SignUpPage() {
  const [signUpOrLogin, setSignUpOrLogin] = useState("login");
  return (
    <>
      {/*Login*/}

      {signUpOrLogin === "login" && (
        <>
          <div className="SignUpPage__options">
            <a
              className={"SignUpPage__options login active-option"}
              onClick={() => setSignUpOrLogin("login")} >
              Log in
            </a>
            <a
              className={"SignUpPage__options signup"}
              onClick={() => setSignUpOrLogin("signup")}
            >
              Sign up
            </a>
          </div>
          <h1 className="SignUpPage__title">Access crewmates</h1>
          <div className="SignUpPage__form">
            <LoginForm />
          </div>
        </>
      )}

      {/*Signup*/}

      {signUpOrLogin === "signup" && (
        <>
          <div className="SignUpPage__options">
            <a
              className={"SignUpPage__options login"}
              onClick={() => setSignUpOrLogin("login")}
            >
              Log in
            </a>
            <a
              className={"SignUpPage__options signup active-option"}
              onClick={() => setSignUpOrLogin("signup")}
            >
              Sign up
            </a>
          </div>
          <h1 className="SignUpPage__title">Access crewmates</h1>
          <div className="SignUpPage__form">
            <SignUpForm />
          </div>
        </>
      )}
    </>
  );}

export default SignUpPage;
