import React, { useContext } from 'react';
import { StoreContext } from '../store/simpleStore';

export const TextInput: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  const [store, setStore] = useContext(StoreContext)!;

  return (
    <div className='field'>
      {value}:{' '}
      <input
        value={store[value]}
        onChange={(e) => setStore({ ...store, [value]: e.target.value })}
      />
    </div>
  );
};
