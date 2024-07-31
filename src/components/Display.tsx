import React, { useContext } from 'react';
import { StoreContext } from '../store/simpleStore';

export const Display: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  const [store] = useContext(StoreContext)!;

  return (
    <div className='value'>
      {value}: {store[value]}
    </div>
  );
};
