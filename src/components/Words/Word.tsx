import React, { useMemo } from 'react';
import { Letter } from '@components/Words/Letter';
import { useWord } from '@components/Words/helpers/useWord';
import { useGameContext } from '@components/Game/GameContext';

export const Word = ({ index }: { index: number }) => {
  const { bingo, complete, wrongWord } = useWord(index); // get these from game context and remove checkWord logic from useWork hook
  const { words, isRightLetter, letterIsInWord } = useGameContext();

  const letters = useMemo(() => words[index], [words, index]);

  return (
    <div className="flex gap-1.5">
      {letters.map((letter, index) => (
        <Letter
          bingo={bingo}
          letter={letter}
          key={index}
          index={index}
          wordIsEntered={complete}
          isRightLetter={
            (isRightLetter && isRightLetter(letter, index)) || false
          }
          letterIsInWord={(letterIsInWord && letterIsInWord(letter)) || false}
          wrongWord={wrongWord}
        />
      ))}
    </div>
  );
};
