import { createContext, useState } from 'react';

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
