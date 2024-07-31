import React, { useContext } from 'react';
import { SimpleStoreContext } from '../store/simpleStore';

export const TextInput: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  const [store, setStore] = useContext(SimpleStoreContext)!;

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
