import { createContext, useState } from 'react';

const useStoreData = () => {
  const store = useState({
    first: '',
    last: '',
  });

  return store;
};

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

export const StoreContext = createContext<UseStoreDataReturnType | null>(null);
