import { useIcons } from "@assets/images";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface DialogProps {
  children?: React.ReactNode | ((closeDialog: () => void) => React.ReactNode);
  trigger?: (
    showDialog: (event: React.MouseEvent<HTMLElement>) => void
  ) => React.ReactNode;
  backdrop?: boolean;
  fullScreen?: boolean;
  title?: string;
}

export const Dialog = ({
  children,
  trigger,
  title = "",
  backdrop = true,
  fullScreen = false,
}: DialogProps) => {
  const {Close} = useIcons();
  const [isShown, setIsShown] = useState(false);
  const [isAnimatedShown, setIsAnimatedShown] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  const showDialog = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsAnimatedShown(true);
    setIsShown(true);
  }, []);

  const closeDialog = useCallback(() => {
    setTimeout(() => setIsShown(false), 280);
    setIsAnimatedShown(false);
  }, []);

  const backdropCloseEvent = useCallback(
    (event: MouseEvent) => {
      if (event.target === dialogRef.current && backdrop) {
        closeDialog();
      }
    },
    [backdrop, closeDialog]
  );

  useEffect(() => {
    if (isShown) {
      document.addEventListener("click", backdropCloseEvent);
    } else {
      document.removeEventListener("click", backdropCloseEvent);
    }

    return () => {
      document.removeEventListener("click", backdropCloseEvent);
    };
  }, [isShown, backdropCloseEvent]);

  return (
    <>
      {trigger && trigger(showDialog)}
      <div
        ref={dialogRef}
        className={`rounded-lg fixed inset-0 justify-center items-center z-10 ${
          fullScreen ? "bg-background" : "bg-background/30"
        } ${isShown ? "flex" : "hidden"}
        ${isAnimatedShown ? "animate-dialogShow" : "animate-dialogHide"} sm:top-0 sm:left-0 sm:inset-auto`}
      >
        <div
          className={`p-5 w-1/4 bg-background ${
            fullScreen ? "" : "shadow-[0_0px_35px_2px_rgba(0,0,0,0.3)]"
          } sm:w-screen`}
        >
          <header className="flex">
            <div className="flex-1" />
            <h1 className="flex-2 text-center font-bold text-xs uppercase text-primary-text">
              {title}
            </h1>
            <button onClick={closeDialog} className="flex-1 flex justify-end">
              <img src={String(Close)} alt="Close button" />
            </button>
          </header>
          {children && typeof children === "function"
            ? children(closeDialog)
            : children}
        </div>
      </div>
    </>
  );
};
