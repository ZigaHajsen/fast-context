import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react';

type FastStore = { first: string; last: string };

const useFastStoreData = (): {
  get: () => FastStore;
  set: (value: Partial<FastStore>) => void;
  subscribe: (callback: () => void) => () => void;
} => {
  const store = useRef({
    first: '',
    last: '',
  });
  const subscribers = useRef(new Set<() => void>());

  const get = useCallback(() => store.current, []);

  const set = useCallback((value: Partial<FastStore>) => {
    store.current = { ...store.current, ...value };

    subscribers.current.forEach((callback) => callback());
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback);

    return () => subscribers.current.delete(callback);
  }, []);

  return {
    get,
    set,
    subscribe,
  };
};

type UseFastStoreDataReturnType = ReturnType<typeof useFastStoreData>;

export const FastStoreContext =
  createContext<UseFastStoreDataReturnType | null>(null);

export const FastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <FastStoreContext.Provider value={useFastStoreData()}>
      {children}
    </FastStoreContext.Provider>
  );
};

export const useFastStore = <SelectorOutput,>(
  selector: (store: FastStore) => SelectorOutput
): [SelectorOutput, (value: Partial<FastStore>) => void] => {
  const store = useContext(FastStoreContext);

  if (!store) {
    throw new Error('Fast store not found');
  }

  // const [state, setState] = useState(() => selector(store.get()));

  // useEffect(() => {
  //   return store.subscribe(() => setState(() => selector(store.get())));
  // }, []);

  const state = useSyncExternalStore(store.subscribe, () =>
    selector(store.get())
  );

  return [state, store.set];
};
