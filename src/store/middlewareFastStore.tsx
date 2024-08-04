import { reduxDevToolsMiddleware } from '../middleware/reduxDevtools';
import { createMiddlewareFastStore } from '../utils/createMiddlewareFastStore';

export const { MiddlewareFastProvider, useMiddlewareFastStore } =
  createMiddlewareFastStore(
    {
      first: '',
      last: '',
    },
    [reduxDevToolsMiddleware]
  );
