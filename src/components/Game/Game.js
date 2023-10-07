import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { Keyboard } from "../Keyboard";
import { Input } from "../Input";
import { Guesses } from "../Guesses";
import { Banner } from "../Banner";

// Pick a random word on every pageload.
// To make debugging easier, we'll log the solution in the console.

function Game() {
  const [answer, setAnswer] = React.useState(() => {
    const res = sample(WORDS);
    console.info({ answer: res });
    return res;
  });
  const [guesses, setGuesses] = React.useState([]);

  const hasEnded = guesses.length === NUM_OF_GUESSES_ALLOWED;
  const hasWon = guesses.some((g) =>
    g.result.every((r) => r.status === "correct")
  );

  function handleSubmit(guess) {
    setGuesses([
      ...guesses,
      { id: crypto.randomUUID(), result: checkGuess(guess, answer) },
    ]);
  }

  function restart() {
    const res = sample(WORDS);
    setAnswer(res);
    console.log({ answer: res });
    setGuesses([]);
  }

  return (
    <>
      <Guesses guesses={guesses} />
      <Input disabled={hasWon || hasEnded} onSubmit={handleSubmit} />
      <Keyboard guesses={guesses} />
      {hasWon && (
        <Banner className="happy" onRestart={restart}>
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong>{guesses.length} guesses</strong>.
          </p>
        </Banner>
      )}
      {hasEnded && !hasWon && (
        <Banner className="sad" onRestart={restart}>
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </Banner>
      )}
    </>
  );
}

export default Game;
