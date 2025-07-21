import "./Button.scss"

function Button({ children, onClick }) {
   return (
    <button className="neon-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button