import React from 'react';
import { TextInput } from './TextInput';

export const FormContainer: React.FC = () => {
  return (
    <div className='container'>
      <h5>FormContainer</h5>
      <TextInput value='first' />
      <TextInput value='last' />
    </div>
  );
};
