import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface NotificationInterface {
  message: string;
  showMessage?: (message: string) => void;
}

const NotificationContext = createContext<NotificationInterface>({message: ''});

export const useNotificationContext = () => useContext(NotificationContext);

export const Notification = ({children}: {children: ReactNode}) => {
  const [message, setMessage] = useState('');

  const showMessage = useCallback((message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  }, []);

  return (
    <NotificationContext.Provider value={{ message, showMessage }}>
      {message && message !== "" ? (
        <output className="animate-fade absolute w-72 mx-auto left-0 right-0 top-40 flex justify-center items-center z-[999]">
          <div className="bg-black rounded-md text-white px-2 py-3 text-xs font-semibold">
            {message}
          </div>
        </output>
      ) : null}
      {children}
    </NotificationContext.Provider>
  );
};
