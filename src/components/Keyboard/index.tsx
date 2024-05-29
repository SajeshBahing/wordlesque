import React, { useState } from "react";
import { Key } from "./Key";

export const Keyboard = () => {
  const [keys] = useState([
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
  ]);

  return (
    <section className="flex flex-col justify-center items-center gap-1.5 mb-1.5 sm:gap-1">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 sm:gap-1">
          {row.map((key) => (
            <Key key={key} character={key} />
          ))}
        </div>
      ))}
    </section>
  );
};
