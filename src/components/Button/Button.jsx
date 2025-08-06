import "./Button.scss";

function Button({ children, type = "button", onClick, disabled }) {
  return (
    <button
      className="neon-button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
