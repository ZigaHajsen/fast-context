import React from 'react';

// import { useSimpleStore } from '../store/simpleStore';
// import { useFastStore } from '../store/fastStore';
import { useMiddlewareFastStore } from '../store/middlewareFastStore';

export const TextInput: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  // const [store, setStore] = useSimpleStore();
  // const [storeValue, setStore] = useFastStore((store) => store[value]);
  const [storeValue, setStore] = useMiddlewareFastStore(
    (store) => store[value]
  );

  return (
    <div className='field'>
      {value}:{' '}
      {/* <input
        value={store[value]}
        onChange={(e) => setStore({ ...store, [value]: e.target.value })}
      /> */}
      <input
        value={storeValue}
        onChange={(e) => setStore({ [value]: e.target.value })}
      />
    </div>
  );
};
