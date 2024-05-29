import { THEME, useLayoutContext } from "@components/Layout/Layout";
import WordleIcon from "./wordle-icon.svg";
import {
  Help as helpDark,
  Backspace as BackspaceDark,
  Close as CloseDark,
  LeaderBoard as LeaderBoardDark,
  Menu as MenuDark,
  Settings as SettingsDark,
} from "@assets/images/dark/index";
import {
  Help,
  Backspace,
  Close,
  LeaderBoard,
  Menu,
  Settings,
} from "@assets/images/light/index";

export { WordleIcon };

export const useIcons = () => {
  const { theme } = useLayoutContext();

  return {
    WordleIcon,
    Help: theme === THEME.LIGHT ? Help : helpDark,
    Backspace: theme === THEME.LIGHT ? Backspace : BackspaceDark,
    Close: theme === THEME.LIGHT ? Close : CloseDark,
    LeaderBoard: theme === THEME.LIGHT ? LeaderBoard : LeaderBoardDark,
    Menu: theme === THEME.LIGHT ? Menu : MenuDark,
    Settings: theme === THEME.LIGHT ? Settings : SettingsDark,
  };
};
