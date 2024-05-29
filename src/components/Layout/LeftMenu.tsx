import React, { useCallback, useEffect, useRef } from 'react';
import { useLayoutContext } from '@components/Layout/Layout';

interface LeftMenuProps {
  className?: string;
}

export const LeftMenu = ({className}: LeftMenuProps) => {
  const { mainMenuRef, isMenuOpen, setIsMenuOpen } = useLayoutContext();
  const sectionReferece = useRef<HTMLElement>(null);

  const handleCloseClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    setIsMenuOpen && setIsMenuOpen(false);
  };

  const handleClickOutsideMenu = useCallback(
    (event: MouseEvent) => {
      let target = event.target as HTMLElement;

      // If the target is an img and its parent is an a, use the parent a as the target
      if (
        target.tagName.toLowerCase() === "img" &&
        target.parentElement?.tagName.toLowerCase() === "a"
      ) {
        target = target.parentNode as HTMLElement;
      }

      if (
        sectionReferece.current &&
        !sectionReferece.current.contains(target) &&
        mainMenuRef.current !== target
      ) {
        setIsMenuOpen && setIsMenuOpen(false);
      }
    },
    [setIsMenuOpen, mainMenuRef]
  );

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutsideMenu);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    }
  }, [isMenuOpen, handleClickOutsideMenu]);

  return (
    <section
      ref={sectionReferece}
      tabIndex={-1}
      className={`w-[22rem] bg-white shadow-[2px_4px_8px_1px_rgb(201,200,199)] absolute top-0 bottom-0 left-0 ${className} p-3 sm:w-screen`}
    >
      <header className="flex">
        <div className="flex-1 text-2xl font-jersey">Games</div>
        <a className="flex-none p-3" href="#header" onClick={handleCloseClick}>
          x
        </a>
      </header>

      <summary className="uppercase text-xs font-bold tracking-tight">
        More from this tutorial
      </summary>
    </section>
  );
};
