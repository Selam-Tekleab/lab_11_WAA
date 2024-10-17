import React, { createContext, useContext, useState, ReactNode } from 'react';


interface DataContextType {
  name: string;
  age: number;
  city: string;
  setUserData: (data: Partial<DataContextType>) => void;
}


const DataContext = createContext<DataContextType | undefined>(undefined);


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<DataContextType>({
    name: '',
    age: 0,
    city: '',
    setUserData: () => {},
  });

  
  const handleSetUserData = (data: Partial<DataContextType>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  return (
    <DataContext.Provider value={{ ...userData, setUserData: handleSetUserData }}>
      {children}
    </DataContext.Provider>
  );
};


export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
