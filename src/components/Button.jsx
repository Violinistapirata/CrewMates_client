import "./Button.css";

function Button({ type, className, onClick, content }) {
  return (
    <button type={type || "button"} className={`Button ${className || ""}`} onClick={onClick || null}>
      {content || "Click me!"}
    </button>
  );
}

export default Button;
