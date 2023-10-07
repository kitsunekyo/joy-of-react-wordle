const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function Keyboard({ guesses }) {
  const stati = guesses.flatMap((g) => g.result);

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.map((letter) => {
            let status;
            const letterStati = stati.filter((s) => s.letter === letter);
            if (letterStati.some((s) => s.status === "correct")) {
              status = "correct";
            } else if (letterStati.some((s) => s.status === "misplaced")) {
              status = "misplaced";
            } else if (letterStati.some((s) => s.status === "incorrect")) {
              status = "incorrect";
            }
            return (
              <KeyboardKey key={letter} status={status}>
                {letter}
              </KeyboardKey>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function KeyboardKey({ status, children }) {
  return <div className={["keyboard-key", status].join(" ")}>{children}</div>;
}
