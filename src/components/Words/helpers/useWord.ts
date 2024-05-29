import {useState, useCallback, useEffect, useMemo} from 'react';
import { useGameContext } from '@components/Game/GameContext';
import { useNotificationContext } from '@components/Notification';

export const useWord = (index: number) => {
  const {showMessage} = useNotificationContext();
  const {
    active,
    deleteLetter,
    addLetter,
    words,
    checkWord,
    transition,
    length,
    triggerCheck,
    setTriggerCheck,
    onScreenKeyboardOnly,
  } = useGameContext();
  const letters = useMemo(() => words[index], [words, index]);
  const [complete, setComplete] = useState(false);
  const [wrongWord, setWrongWord] = useState(false);
  const [bingo, setBingo] = useState(false);

  const isActive = useMemo(() => active === index, [active, index]);

  const handleWordCheck = useCallback(() => {
    if (checkWord) {
      try {
        const isRightWord = checkWord();

        setComplete(true);
        if (isRightWord) {
          setTimeout(() => setBingo(true), length * transition);
        }
      } catch (e) {
        showMessage && showMessage(String(e));
        setWrongWord(false);
        setTimeout(() => setWrongWord(true), 100);
      }
    }
  }, [checkWord, showMessage, transition, length]);

  const keyHandler = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "Enter") {
        handleWordCheck();
      } else if (event.key === "Backspace") {
        setWrongWord(false);
        deleteLetter && deleteLetter();
      } else {
        const letter = event.key.toLowerCase();

        if (/^[a-z]$/.test(letter)) {
          addLetter && addLetter(letter);
        }
      }
    },
    [addLetter, deleteLetter, handleWordCheck]
  );

  useEffect(() => {
    if (isActive && !complete && !onScreenKeyboardOnly) {
      document.addEventListener("keydown", keyHandler);
    } else {
      document.removeEventListener("keydown", keyHandler);
    }

    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [isActive, complete, keyHandler, onScreenKeyboardOnly]);

  useEffect(() => {
    if (triggerCheck && isActive) {
      handleWordCheck();
      setTriggerCheck && setTriggerCheck(false);
    }
  }, [isActive, triggerCheck, handleWordCheck, setTriggerCheck]);

  return {
    letters,
    complete,
    wrongWord,
    bingo,
  };
};
