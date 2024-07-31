import { useState } from 'react';
import { ContentContainer } from './components';
import { StoreContext } from './store';

export const App: React.FC = () => {
  const store = useState({
    first: '',
    last: '',
  });

  return (
    <StoreContext.Provider value={store}>
      <div className='container'>
        <h5>App</h5>
        <ContentContainer />
      </div>
    </StoreContext.Provider>
  );
};
