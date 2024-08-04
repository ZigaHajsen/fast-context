import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useSyncExternalStore,
} from 'react';

type Middleware<FastStore> = (store: {
  get: () => FastStore;
  set: (value: Partial<FastStore>) => void;
  subscribe: (callback: () => void) => () => void;
}) => {
  get: () => FastStore;
  set: (value: Partial<FastStore>) => void;
  subscribe: (callback: () => void) => () => void;
};

export const createMiddlewareFastStore = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FastStore extends Record<string, any>
>(
  initialStore: FastStore,
  middleware: Middleware<FastStore>[]
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

    let storeWithMiddleware: {
      get: () => FastStore;
      set: (value: Partial<FastStore>) => void;
      subscribe: (callback: () => void) => () => void;
    } = { get, set, subscribe };

    middleware.forEach(
      (middleware) => (storeWithMiddleware = middleware(storeWithMiddleware))
    );

    return storeWithMiddleware;
  };

  type UseFastStoreDataReturnType = ReturnType<typeof useFastStoreData>;

  const FastStoreContext = createContext<UseFastStoreDataReturnType | null>(
    null
  );

  const MiddlewareFastProvider: React.FC<PropsWithChildren> = ({
    children,
  }) => {
    return (
      <FastStoreContext.Provider value={useFastStoreData()}>
        {children}
      </FastStoreContext.Provider>
    );
  };

  const useMiddlewareFastStore = <SelectorOutput,>(
    selector: (store: FastStore) => SelectorOutput
  ): [SelectorOutput, (value: Partial<FastStore>) => void] => {
    const store = useContext(FastStoreContext);

    if (!store) {
      throw new Error('Middleware fast store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    );

    return [state, store.set];
  };

  return {
    MiddlewareFastProvider,
    useMiddlewareFastStore,
  };
};
