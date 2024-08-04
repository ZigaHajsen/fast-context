export const reduxDevToolsMiddleware = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Store extends Record<string, any>
>(store: {
  get: () => Store;
  set: (value: Partial<Store>) => void;
  subscribe: (callback: () => void) => () => void;
}) => {
  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();

    devTools.init(store.get());

    let isUpdateFromDevtools = false;

    const originalSet = store.set;
    store.set = (value: Partial<Store>) => {
      originalSet(value);

      if (!isUpdateFromDevtools) {
        devTools.send('UPDATE', store.get());
      }
    };

    devTools.subscribe((message: { type: string; state: string }) => {
      if (message.type === 'DISPATCH' && message.state) {
        const state = JSON.parse(message.state) as Store;
        isUpdateFromDevtools = true;
        store.set(state);
        isUpdateFromDevtools = false;
      }
    });
  }

  return store;
};
