import { createSimpleStore } from '../utils/createSimpleStore';

export const { SimpleProvider, useSimpleStore } = createSimpleStore({
  first: '',
  last: '',
});
