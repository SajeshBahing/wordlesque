import React from 'react';
import { useLayoutContext } from '@components/Layout/Layout';
import {HelpMenu} from '@components/Layout/Header/HelpMenu';
import { LeaderBoardMenu } from '@components/Layout/Header/LeaderBoardMenu';
import { SettingsMenu } from '@components/Layout/Header/SettingsMenu';
import { useIcons } from '@assets/images';

export const Header = () => {
  const {setIsMenuOpen, mainMenuRef} = useLayoutContext();
  const {Menu} = useIcons();

  const handleMenuClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen && setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  return (
    <nav className="border-b border-gray-400 px-3 py-3 flex items-center sm:py-1 sm:justify-between" id="header">
      <div className="flex-1 sm:flex-none">
        <a href="#header" onClick={handleMenuClick} ref={mainMenuRef}>
          <img src={String(Menu)} alt="menu" />
        </a>
      </div>
      <div className="flex-1 font-suez-one text-center text-4xl font-bold text-primary-text sm:text-sm sm:flex-none">
        Wordlesque
      </div>
      <div className="flex-1 flex gap-2 justify-end items-center">
        <HelpMenu />
        <LeaderBoardMenu />
        <SettingsMenu />
        <button className="bg-white border border-black p-2 rounded-full text-sm font-bold sm:flex-none">Subscribe to Games</button>
      </div>
    </nav>
  );
};
