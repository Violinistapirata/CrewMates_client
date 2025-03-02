import "./Button.css";

function Button({ onClick, children }) {
  return (
    <button type="submit" className="Button" onClick={onClick || null}>
      {children}
    </button>
  );
}

export default Button;
