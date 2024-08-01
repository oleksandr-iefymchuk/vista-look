import { createContext, useContext } from 'react';

export const TabControlContext = createContext();

export const useTabContext = () => useContext(TabControlContext);
