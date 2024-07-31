import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFastStore = <FastStore extends Record<string, any>>(
  initialStore: FastStore
) => {
  const useFastStoreData = (): {
    get: () => FastStore;
    set: (value: Partial<FastStore>) => void;
    subscribe: (callback: () => void) => () => void;
  } => {
    const store = useRef(initialStore);
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

  const FastStoreContext = createContext<UseFastStoreDataReturnType | null>(
    null
  );

  const FastProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <FastStoreContext.Provider value={useFastStoreData()}>
        {children}
      </FastStoreContext.Provider>
    );
  };

  const useFastStore = <SelectorOutput,>(
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

  return {
    FastProvider,
    useFastStore,
  };
};
