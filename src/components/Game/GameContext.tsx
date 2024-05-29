import { SetState } from '@shared/types';
import NSpell from 'nspell';
import React, { useCallback, useEffect, useState } from 'react';
import dictionary from '@assets/en';
import { generate } from 'random-words';
import { useNotificationContext } from '@components/Notification';

interface GameContextInterface {
  active: number;
  setActive: SetState<number>;
  length: number;
  word: string;
  spell: ReturnType<typeof NSpell> | undefined;
  transition: number;
  tries: number;
  hardMode: boolean;
  setHardMode?: SetState<boolean>;
  words: string[][];
  isRightLetter?: (letter: string, index: number) => boolean;
  letterIsInWord?: (letter: string) => boolean;
  deleteLetter?: () => void;
  addLetter?: (letter: string) => void;
  checkWord?: () => boolean;
  triggerCheck: boolean;
  setTriggerCheck?: SetState<boolean>;
  gameOver: boolean;
  usedLetters: string[];
  lettersInWord: string[];
  correctLetters: string[];
  onScreenKeyboardOnly?: boolean;
  toggleOnScreenKeyboardOnly?: () => void;
}

const GameContext = React.createContext<GameContextInterface>({
  active: 0,
  setActive: () => {},
  length: 0,
  word: "",
  spell: undefined,
  transition: 500,
  tries: 0,
  words: [],
  triggerCheck: false,
  gameOver: false,
  usedLetters: [],
  lettersInWord: [],
  correctLetters: [],
  hardMode: false,
});

// Bugs:
// If the letter only appears once in the word and guess word has two of the same letter make only one green or yellow
// if user hits enter without adding any Letter, and the completes the Word, flip animation is not triggered

export const useGameContext = () => React.useContext(GameContext);

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {showMessage} = useNotificationContext();
  const [transition] = useState(500);
  const [length] = useState(5);
  const [tries] = useState(6);
  const [active, setActive] = useState(0);
  const [word] = useState(
    generate({ minLength: length, maxLength: length }) as string
  );
  const [spell, setSpell] = useState<ReturnType<typeof NSpell>>();
  const [triggerCheck, setTriggerCheck] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [lettersInWord, setLettersInWord] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [hardMode, setHardMode] = useState(false);
  const [onScreenKeyboardOnly, setOnScreenKeyboardOnly] = useState(false);

  const [words, setWords] = useState<string[][]>(
    Array.from({ length: tries }, () => Array.from({ length }, () => ""))
  );

  const toggleOnScreenKeyboardOnly = useCallback(() => {
    setOnScreenKeyboardOnly((onScreenKeyboardOnly) => !onScreenKeyboardOnly);
  }, []);

  const isRightLetter = useCallback(
    (letter: string, index: number) => {
      const letterInWord = word[index];

      return word.includes(letter) && letterInWord === letter;
    },
    [word]
  );

  const letterIsInWord = useCallback(
    (letter: string) => {
      return word.includes(letter);
    },
    [word]
  );

  const setLetters = useCallback(
    (letters: string[]) => {
      return new Promise(() => {
        setTimeout(() => {
          for (let i = 0; i < letters.length; i++) {
            const letter = letters[i];
            if (letterIsInWord(letter) && !lettersInWord.includes(letter)) {
              setLettersInWord((lettersInWord) => [...lettersInWord, letter]);
            }
    
            if (isRightLetter(letter, i) && !correctLetters.includes(letter)) {
              setCorrectLetters((correctLetters) => [...correctLetters, letter]);
            }
    
            if (!usedLetters.includes(letter)) {
              setUsedLetters((usedLetters) => [...usedLetters, letter]);
            }
          }
        }, transition * length);
      });
    },
    [
      isRightLetter,
      letterIsInWord,
      lettersInWord,
      correctLetters,
      usedLetters,
      transition,
      length,
    ]
  );

  const checkWord = useCallback(() => {
    const letters = words[active];
    const enteredWord = letters.join("");

    if (enteredWord.length < length) {
      throw new Error("Not enough letters!");
    }

    if (hardMode && lettersInWord.length > 0) {
      const hardModeCheck = letters.filter((letter) =>
        lettersInWord.includes(letter)
      );

      if (
        hardModeCheck.length <
        lettersInWord.filter((letter, index, self) => self.indexOf(letter))
          .length
      ) {
        // this error message can be improved to show singular/plural hint/hints
        // based on guessed letters
        throw new Error("Must use previously revealed hints");
      }
    }

    if (spell && spell.correct(enteredWord)) {
      if (word !== enteredWord) {
        if (active < tries - 1) {
          setTimeout(
            () => setActive((active) => active + 1),
            (length - 1) * transition
          );
        } else {
          showMessage && showMessage(word);
        }
        setLetters(letters);
        return false;
      } else {
        setGameOver(true);
        return true;
      }
    } else {
      throw new Error("Word not found!");
    }
  }, [
    hardMode,
    lettersInWord,
    tries,
    active,
    words,
    word,
    spell,
    length,
    setActive,
    showMessage,
    transition,
    setLetters,
  ]);

  const deleteLetter = useCallback(() => {
    const wordsCopy = [...words];
    const letters = wordsCopy[active];
    const newLetters = [...letters];
    const index = newLetters.findIndex((l) => l === "");

    if (index === -1) {
      newLetters[newLetters.length - 1] = "";
    } else {
      newLetters[index - 1] = "";
    }

    wordsCopy[active] = newLetters;
    setWords(wordsCopy);
  }, [active, words]);

  const addLetter = useCallback(
    (letter: string) => {
      const wordsCopy = [...words];
      const letters = wordsCopy[active];
      const newLetters = [...letters];
      const index = newLetters.findIndex((l) => l === "");

      if (index !== -1) {
        newLetters[index] = letter;
      }

      wordsCopy[active] = newLetters;
      setWords(wordsCopy);
    },
    [active, words]
  );

  useEffect(() => {
    const spell = NSpell(dictionary());
    setSpell(spell);
  }, []);

  return (
    <GameContext.Provider
      value={{
        active,
        setActive,
        word,
        spell,
        length,
        transition,
        tries,
        isRightLetter,
        letterIsInWord,
        words,
        deleteLetter,
        addLetter,
        checkWord,
        triggerCheck,
        setTriggerCheck,
        gameOver,
        usedLetters,
        lettersInWord,
        correctLetters,
        hardMode,
        setHardMode,
        onScreenKeyboardOnly,
        toggleOnScreenKeyboardOnly,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};