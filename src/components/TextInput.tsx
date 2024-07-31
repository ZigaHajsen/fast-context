import React from 'react';

export const TextInput: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  return (
    <div className='field'>
      {value}: <input />
    </div>
  );
};
