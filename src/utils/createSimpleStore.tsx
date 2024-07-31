import { createContext, PropsWithChildren, useContext, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSimpleStore = <SimpleStore extends Record<string, any>>(
  initialStore: SimpleStore
) => {
  const useSimpleStoreData = () => {
    const store = useState(initialStore);

    return store;
  };

  type UseSimpleStoreDataReturnType = ReturnType<typeof useSimpleStoreData>;

  const SimpleStoreContext = createContext<UseSimpleStoreDataReturnType | null>(
    null
  );

  const SimpleProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <SimpleStoreContext.Provider value={useSimpleStoreData()}>
        {children}
      </SimpleStoreContext.Provider>
    );
  };

  const useSimpleStore = () => {
    const store = useContext(SimpleStoreContext);

    return store;
  };

  return {
    SimpleProvider,
    useSimpleStore,
  };
};
