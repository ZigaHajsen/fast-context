import { createFastStore } from '../utils/createFastStore';

export const { FastProvider, useFastStore } = createFastStore({
  first: '',
  last: '',
});
