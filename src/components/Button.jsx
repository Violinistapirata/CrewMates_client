import "./Button.css";

function Button({ type, onClick, text }) {
  return (
    <button type={type} className={`Button ${type == "submit" && "Button--submit" }`} onClick={onClick || null}>
      {text}
    </button>
  );
}

export default Button;
