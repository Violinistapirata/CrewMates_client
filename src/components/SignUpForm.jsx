import "./SignUpForm.css";

function SignUpForm() {
    function handleSubmit (e) {
        e.preventDefault();
        console.log("Sign Up form submitted");
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="full name">User Name</label>
            <input type="text" name="full name" />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" />

            <button type="submit"> Create new user </button>
        </form>
    )
}

export default SignUpForm;