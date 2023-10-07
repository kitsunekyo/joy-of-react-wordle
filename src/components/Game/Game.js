import React from "react";

import { sample, range } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { Keyboard } from "../Keyboard";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const hasEnded = guesses.length === NUM_OF_GUESSES_ALLOWED;
  const hasWon = guesses.some((g) =>
    g.result.every((r) => r.status === "correct")
  );

  return (
    <>
      <GuessResults guesses={guesses} />
      <Input
        disabled={hasWon || hasEnded}
        onSubmit={(guess) =>
          setGuesses([
            ...guesses,
            { id: crypto.randomUUID(), result: checkGuess(guess, answer) },
          ])
        }
      />
      <Keyboard guesses={guesses} />
      {hasWon && <HappyBanner rounds={guesses.length} />}
      {hasEnded && !hasWon && <SadBanner />}
    </>
  );
}

export default Game;

function Input({ disabled, onSubmit }) {
  const [guess, setGuess] = React.useState("");

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(e) => {
        if (disabled) return;
        e.preventDefault();
        onSubmit(guess);
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        disabled={disabled}
        id="guess-input"
        type="text"
        pattern="[a-zA-Z]{5,5}"
        maxLength={5}
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
      />
    </form>
  );
}

function GuessResults({ guesses }) {
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

function HappyBanner({ rounds }) {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in
        <strong>{rounds} guesses</strong>.
      </p>
    </div>
  );
}

function SadBanner() {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
}
