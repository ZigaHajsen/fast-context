import React from 'react';

export const Display: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  return (
    <div className='value'>
      {value}: {''}
    </div>
  );
};
