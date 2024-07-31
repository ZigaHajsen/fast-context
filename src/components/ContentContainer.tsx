import React from 'react';
import { DisplayContainer } from './DisplayContainer';
import { FormContainer } from './FormContainer';

export const ContentContainer: React.FC = () => {
  return (
    <div className='container'>
      <h5>ContentContainer</h5>
      <FormContainer />
      <DisplayContainer />
    </div>
  );
};
