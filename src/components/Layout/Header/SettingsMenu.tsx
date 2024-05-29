import React from "react";
import { Dialog } from "@shared/components/Dialog";
import { ListItem, ListItemType } from "./ListItem";
import { handleFAQ } from "@components/Layout/Header/service/Settings";
import { useHardMode } from "@components/Layout/Header/helper/useHardMode";
import { THEME, useLayoutContext } from "@components/Layout/Layout";
import { useIcons } from "@assets/images";
import { useGameContext } from "@components/Game/GameContext";

export const SettingsMenu = () => {
  const { disabled, hardMode, handleHardMode } = useHardMode();
  const { theme, toggleTheme, toggleHighContrast } = useLayoutContext();
  const { toggleOnScreenKeyboardOnly } = useGameContext();
  const { Settings } = useIcons();

  return (
    <Dialog
      title="Settings"
      trigger={(showDialog) => (
        <a href="#help" onClick={showDialog}>
          <img src={String(Settings)} alt="menu" />
        </a>
      )}
    >
      <ListItem
        disabled={disabled}
        checked={hardMode}
        as={ListItemType.Switch}
        title="Hard Mode"
        subText="Any revealed hints must be used in subsequent guesses"
        onChange={handleHardMode}
      />
      <ListItem
        onChange={toggleTheme}
        as={ListItemType.Switch}
        title={theme === THEME.DARK ? "Light Theme" : "Dark Theme"}
      />
      <ListItem
        onChange={toggleHighContrast}
        as={ListItemType.Switch}
        title="High Contrast Mode"
        subText="Contrast and colorblindness improvements"
      />
      <ListItem
        onChange={toggleOnScreenKeyboardOnly}
        as={ListItemType.Switch}
        title="Onscreen Keyboard Input Only"
        subText="Ignore key input except from the onscreen keyboard. Most helpful for users using speech recognition or other assistive devices."
      />
      <ListItem as={ListItemType.Link} title="Feedback" linkText="Email" />
      <ListItem as={ListItemType.Link} title="Report a Bug" linkText="Email" />
      <ListItem
        as={ListItemType.Link}
        title="Community"
        linkText="Wordle Review"
      />
      <ListItem
        as={ListItemType.Link}
        title="Question?"
        linkText="FAQ"
        onClick={handleFAQ}
      />
      <section className="flex justify-between items-center text-xs text-secondary-text">
        <div>&copy; 2024 My Own Company</div>
        <div>#1324</div>
      </section>
    </Dialog>
  );
};
