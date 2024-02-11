import { createContext, useState, ReactNode } from 'react';

interface CollapsibleContextType {
  states: { [id: string]: boolean };
  setCollapsedState: (id: string, state: boolean) => void;
}

export const CollapsibleContext = createContext<
  CollapsibleContextType | undefined
>(undefined);

export const CollapsibleProvider = ({ children }: { children: ReactNode }) => {
  const [states, setStates] = useState<{ [id: string]: boolean }>({});

  const setCollapsedState = (id: string, state: boolean) => {
    setStates(prevStates => ({ ...prevStates, [id]: state }));
  };

  return (
    <CollapsibleContext.Provider value={{ states, setCollapsedState }}>
      {children}
    </CollapsibleContext.Provider>
  );
};
