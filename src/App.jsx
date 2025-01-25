import { useState } from "react";
import Header from "./components/Header";
import { languages } from "./components/languages";
import { clsx } from "clsx";
console.log(languages);

function App() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedletters, setGuessedletters] = useState([]);
  console.log(guessedletters);
  const wrongGuessesCount = guessedletters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedletters.includes(letter));
  const isGameLost = wrongGuessesCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const addGuessedLetter = (letter) => {
    setGuessedletters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  };

  const gameStatesClass = clsx("Game_States_Section",{
    won: isGameWon,
    lost: isGameLost
  })

  return (
    <>
      <Header />
      <section className={gameStatesClass}>
        {isGameOver ? (
          isGameWon ? (
            <>
              <h2>You WIN!</h2>
              <p>Well Done </p>
            </>
          ) : (
            <>
              <h2>Game OVER!</h2>
              <p>You lose!</p>
            </>
          )
        ) : null}
      </section>

      <section className="languages_chips">
        {languages.map((language, index) => {
          const isLanguageLost = index < wrongGuessesCount;
          return (
            <span
              className={`chip ${isLanguageLost ? "lost" : ""}`}
              style={{
                backgroundColor: language.backgroundColor,
                color: language.color,
              }}
              key={language.name}
            >
              {language.name}
            </span>
          );
        })}
      </section>

      <section className="word">
        {currentWord.split("").map((letter, index) => (
          <span key={index}>
            {guessedletters.includes(letter) ? letter.toUpperCase() : ""}
          </span>
        ))}
      </section>

      <section className="keyboard">
        {alphabet.split("").map((letter) => {
          const isGuessed = guessedletters.includes(letter);
          const isCorrect = isGuessed && currentWord.includes(letter);
          const isWrong = isGuessed && !currentWord.includes(letter);
          const className = clsx({
            correct: isCorrect,
            wrong: isWrong,
          });

          return (
            <button
              className={className}
              key={letter}
              onClick={() => addGuessedLetter(letter)}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </section>

      <section>
        {isGameOver && <button className="new_game_btn">New Game</button>}
      </section>
    </>
  );
}

export default App;
