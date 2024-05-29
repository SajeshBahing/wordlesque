import React, { useCallback, useMemo, useState } from "react";
import { Backspace } from "@assets/images/light";
import { useGameContext } from "@components/Game/GameContext";

export const Key = ({character}: {character: string}) => {
  const [clicked, setClicked] = useState(false);
  const {
    gameOver,
    addLetter,
    deleteLetter,
    setTriggerCheck,
    usedLetters,
    lettersInWord,
    correctLetters,
  } = useGameContext();

  const clickHandler = useCallback(() => {
    if (gameOver) return;

    setClicked(true);
    setTimeout(() => setClicked(false), 100);

    if (character === "enter") {
      setTriggerCheck && setTriggerCheck(true);
    } else if (character === "backspace") {
      deleteLetter && deleteLetter();
    } else {
      addLetter && addLetter(character);
    }
  }, [gameOver, character, addLetter, deleteLetter, setTriggerCheck]);

  const letterColor = useMemo(() => {
    let className = "bg-gray-300 text-black";
    if (usedLetters.includes(character)) {
      className = "bg-zinc-500 text-white";
    }

    if (lettersInWord.includes(character)) {
      className = "bg-secondary text-white";
    }

    if (correctLetters.includes(character)) {
      className = "bg-primary text-white";
    }

    return className;
  }, [usedLetters, lettersInWord, correctLetters, character]);

  return (
    <button
      onClick={clickHandler}
      className={`py-4 px-3 min-w-11 ${letterColor} rounded uppercase font-bold text-lg sm:min-w-0 sm:w-8 sm:px-1 ${
        character === "enter" ? "text-sm sm:text-xs sm:w-12 sm:px-0.5" : ""
      } ${character === "backspace" ? "sm:w-12 flex justify-center" : ""} ${clicked ? "bg-gray-400" : ""}`}
    >
      {character === "backspace" ? (
        <img src={String(Backspace)} alt="delete" />
      ) : (
        character
      )}
    </button>
  );
};
