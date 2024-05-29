import React, { useEffect, useMemo, useState } from "react";
import { useGameContext } from "@components/Game/GameContext";

interface LetterProps {
  index: number;
  letter: string;
  wordIsEntered: boolean;
  isRightLetter: boolean;
  letterIsInWord: boolean;
  wrongWord: boolean;
  bingo: boolean;
}

export const Letter = ({
  index,
  letter,
  wordIsEntered,
  letterIsInWord,
  isRightLetter,
  wrongWord,
  bingo,
}: LetterProps) => {
  const {transition} = useGameContext();
  const [rotateClass, setRotateClass] = useState('');
  const [jumpClass, setJumpClass] = useState('');

  const classNames = useMemo(() => {
    let classes =
      "border-2 w-[4rem] h-[4rem] flex justify-center items-center uppercase text-3xl font-bold text-primary-text sm:w-[3.5rem] sm:h-[3.5rem]";

    if (letter !== "") {
      classes += " border-gray-500";

      if (!wordIsEntered && !bingo) {
        classes += " animate-pop";
      }
    } else {
      classes += " border-gray-500/40";
    }

    if (wrongWord) {
      classes += " animate-shake";
    }

    return classes;
  }, [letter, wordIsEntered, wrongWord, bingo]);

  useEffect(() => {
    if (wordIsEntered) {
      setTimeout(() => {
        let classes = '';

        if (wordIsEntered && !letterIsInWord && !isRightLetter) {
          classes += " bg-tertiary border-tertiary text-white";
        }

        if (wordIsEntered && letterIsInWord && !isRightLetter) {
          classes += " bg-secondary border-secondary text-white";
        }

        if (wordIsEntered && isRightLetter) {
          classes += " bg-primary border-primary text-white";
        }

        if (wordIsEntered) {
          classes += " animate-flip";
        }

        if (bingo) {
          classes += " animate-jump";
        }

        setRotateClass(classes);
      }, index * transition);
    }
  }, [index, letter, wordIsEntered, letterIsInWord, isRightLetter, wrongWord, transition, bingo]);

  useEffect(() => {
    if (bingo) {
      setTimeout(() => {
        setJumpClass('animate-jump');
      }, index * 100);
    }
  }, [index, bingo]);

  return <div className={`${classNames} ${rotateClass} ${jumpClass}`}>{letter}</div>;
};
