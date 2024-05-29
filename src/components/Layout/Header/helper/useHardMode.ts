import { useGameContext } from "@components/Game/GameContext";
import { useNotificationContext } from "@components/Notification";
import { useCallback } from "react";

export const useHardMode = () => {
  const {active, hardMode, setHardMode} = useGameContext();
  const {showMessage} = useNotificationContext();

  const handleHardMode = useCallback(() => {
    if (active !== 0 && !hardMode) {
      showMessage &&
        showMessage(
          "You can only change the difficulty before starting a new game!"
        );

      return;
    }

    setHardMode && setHardMode((prev) => !prev);
  }, [active, hardMode, setHardMode, showMessage]);

  return {
    hardMode,
    handleHardMode,
    disabled: active !== 0,
  }
};
