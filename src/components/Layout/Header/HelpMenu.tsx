import React from "react";
import { Dialog } from '@shared/components/Dialog';
import { useIcons } from "@assets/images";

export const HelpMenu = () => {
  const {Help} = useIcons();

  return (
    <Dialog
      trigger={(showDialog) => (
        <a href="#help" onClick={showDialog}>
          <img src={String(Help)} alt="menu" />
        </a>
      )}
    >
      <h1 className="text-primary-text">This is a help section</h1>
    </Dialog>
  );
}