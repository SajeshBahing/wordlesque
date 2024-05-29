import React, { useCallback, useContext, useEffect } from "react";

import { Header } from "@components/Layout/Header";
import { Body } from "@components/Layout/Body";
import { SetState } from "@shared/types";
import { Notification } from "@components/Notification";
import { GameContextProvider } from "@components/Game/GameContext";

export enum THEME {
  LIGHT = "theme-light",
  DARK = "theme-dark",
}

interface LayoutContextInterface {
  mainMenuRef: React.RefObject<HTMLAnchorElement>;
  isMenuOpen: boolean;
  setIsMenuOpen?: SetState<boolean>;
  theme: THEME;
  setTheme?: SetState<THEME>;
  toggleHighContrast?: () => void;
  toggleTheme?: () => void;
}

const LayoutContext = React.createContext<LayoutContextInterface>({
  isMenuOpen: false,
  mainMenuRef: { current: null } as React.RefObject<HTMLAnchorElement>,
  theme: THEME.LIGHT,
});

export const useLayoutContext = () => useContext(LayoutContext);

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(THEME.LIGHT);
  const [hiContrast, setHiContrast] = React.useState(false);

  const mainMenuRef = React.useRef<HTMLAnchorElement>(null);
  const originalColors = React.useRef<{ primary: string; secondary: string }>({
    primary: "",
    secondary: "",
  });

  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setHiContrast((hiContrast) => !hiContrast);
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
  
    if (theme === THEME.LIGHT) {
      htmlElement.classList.remove(THEME.DARK);
      htmlElement.classList.add(THEME.LIGHT);
    } else {
      htmlElement.classList.remove(THEME.LIGHT);
      htmlElement.classList.add(THEME.DARK);
    }
  }, [theme]);

  useEffect(() => {
    if (hiContrast) {
      const htmlElement = document.documentElement;
      // Store the original values
      originalColors.current.primary = getComputedStyle(
        htmlElement
      ).getPropertyValue("--color-theme-primary");
      originalColors.current.secondary = getComputedStyle(
        htmlElement
      ).getPropertyValue("--color-theme-secondary");

      htmlElement.style.setProperty("--color-theme-primary", '#85c0f9');
      htmlElement.style.setProperty("--color-theme-secondary", '#f5793a');
    } else {
      const htmlElement = document.documentElement;
      htmlElement.style.setProperty(
        "--color-theme-primary",
        originalColors.current.primary
      );
      htmlElement.style.setProperty(
        "--color-theme-secondary",
        originalColors.current.secondary
      );
    }
  }, [hiContrast]);

  useEffect(() => {
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  
    setVh();
  
    window.addEventListener('resize', setVh);
  
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <section className="flex flex-col w-screen bg-background" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <LayoutContext.Provider
        value={{
          mainMenuRef,
          isMenuOpen,
          setIsMenuOpen,
          theme,
          setTheme,
          toggleTheme,
          toggleHighContrast,
        }}
      >
        <Notification>
          <GameContextProvider>
            <Header />
            <Body />
          </GameContextProvider>
        </Notification>
      </LayoutContext.Provider>
    </section>
  );
};
