import { range } from "../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../constants";

export function Guesses({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map(({ id, result }) => (
        <GuessResult key={id} result={result} />
      ))}
      {range(NUM_OF_GUESSES_ALLOWED - guesses.length).map((i) => (
        <EmptyGuess key={i} />
      ))}
    </div>
  );
}

function Guess({ children }) {
  return <div className="guess">{children}</div>;
}

function GuessCell({ children, className }) {
  return <span className={["cell", className].join(" ")}>{children}</span>;
}

function EmptyGuess() {
  return (
    <Guess>
      {range(NUM_OF_GUESSES_ALLOWED - 1).map((i) => (
        <GuessCell key={i} />
      ))}
    </Guess>
  );
}

function GuessResult({ result }) {
  return (
    <Guess>
      {result.map(({ letter, status }, i) => (
        <GuessCell className={status} key={i}>
          {letter}
        </GuessCell>
      ))}
    </Guess>
  );
}
