import { reduxDevToolsMiddleware } from '../middleware/reduxDevToolsMiddleware';
import { createMiddlewareFastStore } from '../utils/createMiddlewareFastStore';

export const { MiddlewareFastProvider, useMiddlewareFastStore } =
  createMiddlewareFastStore(
    {
      first: '',
      last: '',
    },
    [reduxDevToolsMiddleware]
  );
