import React, { useContext } from 'react';
import { SimpleStoreContext } from '../store/simpleStore';

export const Display: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  const [store] = useContext(SimpleStoreContext)!;

  return (
    <div className='value'>
      {value}: {store[value]}
    </div>
  );
};
