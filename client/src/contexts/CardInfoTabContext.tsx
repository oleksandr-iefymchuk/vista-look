import { createContext, ReactNode, useContext, useState } from 'react';

type CardInfoTabContextType = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
};

const initState: CardInfoTabContextType = {
  activeTab: 'description',
  setActiveTab: () => undefined
};

export const CardInfoTabContext = createContext<CardInfoTabContextType>(initState);

export const CardInfoTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(initState.activeTab);

  return <CardInfoTabContext.Provider value={{ activeTab, setActiveTab }}>{children}</CardInfoTabContext.Provider>;
};

export const useCardInfoTabContext = () => useContext(CardInfoTabContext);
