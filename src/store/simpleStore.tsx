import { createContext, PropsWithChildren, useContext, useState } from 'react';

const useSimpleStoreData = () => {
  const store = useState({
    first: '',
    last: '',
  });

  return store;
};

type UseSimpleStoreDataReturnType = ReturnType<typeof useSimpleStoreData>;

export const SimpleStoreContext =
  createContext<UseSimpleStoreDataReturnType | null>(null);

export const SimpleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SimpleStoreContext.Provider value={useSimpleStoreData()}>
      {children}
    </SimpleStoreContext.Provider>
  );
};

export const useSimpleStore = () => {
  const store = useContext(SimpleStoreContext);

  return store;
};
