import React from "react";
import { Word } from "@components/Words/Word";
import { useGameContext } from "@components/Game/GameContext";

export const Words = () => {
  const {words} = useGameContext();

  return (
    <section className="flex-1 flex flex-col justify-center items-center gap-y-1.5">
        {words.map((_, index) => (
          <Word key={index} index={index} />
        ))}
    </section>
  );
};
