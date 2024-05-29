import React from 'react';
import { LeftMenu } from '@components/Layout/LeftMenu';
import { useLayoutContext } from '@components/Layout/Layout';
import { Words } from '@components/Words/index';
import { Keyboard } from '@components/Keyboard';

export const Body = () => {
  const {isMenuOpen} = useLayoutContext();

  return (
    <section className="flex flex-1 flex-col relative">
      <LeftMenu
        className={`transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      />

      <Words />
      <Keyboard />
      
    </section>
  );
};
