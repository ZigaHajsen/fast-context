import React from 'react';

// import { useSimpleStore } from '../store/simpleStore';
// import { useFastStore } from '../store/fastStore';
import { useMiddlewareFastStore } from '../store/middlewareFastStore';

export const Display: React.FC<{ value: 'first' | 'last' }> = ({ value }) => {
  // const [store] = useSimpleStore();
  // const [storeValue] = useFastStore((store) => store[value]);
  const [storeValue] = useMiddlewareFastStore((store) => store[value]);

  // return (
  //   <div className='value'>
  //     {value}: {store[value]}
  //   </div>
  // );

  return (
    <div className='value'>
      {value}: {storeValue}
    </div>
  );
};
