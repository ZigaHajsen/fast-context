import { ContentContainer } from './components';
// import { SimpleProvider } from './store/simpleStore';
// import { FastProvider } from './store/fastStore';
import { MiddlewareFastProvider } from './store/middlewareFastStore';

export const App: React.FC = () => {
  return (
    // <SimpleProvider>
    // <FastProvider>
    <MiddlewareFastProvider>
      <div className='container'>
        <h5>App</h5>
        <ContentContainer />
      </div>
    </MiddlewareFastProvider>
    // </FastProvider>
    // </SimpleProvider>
  );
};
