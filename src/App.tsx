import { useState } from 'react';
import { ContentContainer } from './components';
import { SimpleStoreContext } from './store/simpleStore';

export const App: React.FC = () => {
  const store = useState({
    first: '',
    last: '',
  });

  return (
    <SimpleStoreContext.Provider value={store}>
      <div className='container'>
        <h5>App</h5>
        <ContentContainer />
      </div>
    </SimpleStoreContext.Provider>
  );
};
