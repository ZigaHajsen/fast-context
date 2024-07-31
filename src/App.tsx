import { ContentContainer } from './components';
// import { SimpleProvider } from './store/simpleStore';
import { FastProvider } from './store/fastStore';

export const App: React.FC = () => {
  return (
    // <SimpleProvider>
    <FastProvider>
      <div className='container'>
        <h5>App</h5>
        <ContentContainer />
      </div>
    </FastProvider>
    // </SimpleProvider>
  );
};
