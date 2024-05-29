import React from "react";
import { Dialog } from '@shared/components/Dialog';
import { useIcons, WordleIcon } from "@assets/images";

export const LeaderBoardMenu = () => {
  const {LeaderBoard} = useIcons();
  return (
    <Dialog
      backdrop={false}
      fullScreen={true}
      trigger={(showDialog) => (
        <a href="#help" onClick={showDialog}>
          <img src={String(LeaderBoard)} alt="menu" />
        </a>
      )}
    >
      <img className="mx-auto mb-10" src={String(WordleIcon)} alt="Wordle" />

      <h1 className="text-4xl text-center text-primary-text">
        Here to see your stats and streaks?
      </h1>

      <div className="flex flex-col justify-center items-center py-10 gap-5 border-b">
        <button className="py-4 px-12 bg-primary-button text-primary-button-text rounded-full font-bold text-sm">
          Create a free account
        </button>

        <a href="#register" className="underline text-primary-text">
          Already Refistered? Log In
        </a>
      </div>

      <div className="mt-5 text-sm text-primary-text">
        <p className="font-bold">
          Wordle bot gives an analysis of you guesses.
        </p>
        <a href="#bot" className="underline">
          Did you beat the bot?
        </a>
      </div>

      <div className="flex justify-center items-center py-10 gap-5 flex-col">
        <button className="py-4 px-12 rounded-full bg-green-500 text-white font-bold text-sm">
          Share
        </button>

        <button className="py-5 px-12 rounded-md bg-yellow-300 font-bold text-sm">
          A big yellow button
        </button>
      </div>
    </Dialog>
  );
}