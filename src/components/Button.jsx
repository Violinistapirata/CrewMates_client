import "./Button.css";

function Button({ type, className, onClick, content, disabled }) {
  return (
    <button
      type={type || "button"}
      className={`Button ${className || ""}`}
      onClick={onClick || null}
      disabled={disabled}
    >
      {content || "Click me!"}
    </button>
  );
}

export default Button;
