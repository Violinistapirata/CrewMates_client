import "./Navbar.css";

function Navbar() {
    return(
        <nav className="navbar">
            <ul className = "navbar__links">
                <li>Home</li>
                <li>About us</li>
                <li>Sign Up</li>
                <li>Login</li>
            </ul>
        </nav>
    )
}

export default Navbar;