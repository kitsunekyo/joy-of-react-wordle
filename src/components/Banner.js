export function Banner({ children, className, onRestart }) {
  return (
    <div className={["banner", className].join(" ")}>
      {children}
      <button onClick={onRestart} className="button">
        Restart Game
      </button>
    </div>
  );
}
