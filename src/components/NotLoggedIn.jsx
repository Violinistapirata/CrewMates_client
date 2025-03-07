import "./NotLoggedIn.css";
import { Link } from "react-router-dom";

function NotLoggedIn() {
  return (
    <div className="NotLoggedIn">
      <p className="NotLoggedIn__icon">🚫</p>
      <p className="NotLoggedIn__message">
        You&apos;re currently not logged in. <br />
        Please <Link to={`/sign-up`}>log in</Link> to view this page.{" "}
      </p>
    </div>
  );
}

export default NotLoggedIn;
