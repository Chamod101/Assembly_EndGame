import { useState } from "react";
import Header from "./components/Header";
import { languages } from "./components/languages";
console.log(languages);

function App() {
  const [currentWord, setCurrentWord] = useState("React");
  const [guessedletters, setGuessedletters] = useState([]);
  console.log(guessedletters);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const addGuessedLetter = (letter) => {
    setGuessedletters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  };

  return (
    <>
      <Header />
      <section className="Game_States_Section">
        <h2>You WIN!</h2>
        <p>Well Done </p>
      </section>

      <section className="languages_chips">
        {languages.map((language) => (
          <span
            className="chip"
            style={{
              backgroundColor: language.backgroundColor,
              color: language.color,
            }}
            key={language.name}
          >
            {language.name}
          </span>
        ))}
      </section>

      <section className="word">
        {currentWord.split("").map((letter, index) => (
          <span key={index}>{letter.toUpperCase()}</span>
        ))}
      </section>

      <section className="keyboard">
        {alphabet.split("").map((letter) => {
          const isGuessed = guessedletters.includes(letter)
          const isCorrect = isGuessed && currentWord.includes(letter)
          const isWrong = isGuessed && !currentWord.includes(letter)

          return (
            <button key={letter} onClick={() => addGuessedLetter(letter)}>
              {letter.toUpperCase()}
            </button>
          );
        })}
      </section>

      <section className="new_game_btn">
        <p>New Game</p>
      </section>
    </>
  );
}

export default App;
