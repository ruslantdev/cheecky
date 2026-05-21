import {loadWithRetry} from '@utils/chunk';
import type {TPage} from '@/types/page';
import type {TRoute} from '@/types/route';

export const ROUTES: Record<TPage, TRoute> = {
  home: {
    path: '/',
    component: () => loadWithRetry(() => import('@modules/pages/PageHome')),
  },
  subscriptions: {
    path: '/subscriptions',
    component: () =>
      loadWithRetry(() => import('@modules/pages/PageSubscriptions')),
  },

  test: {
    path: '/test',
    component: () => loadWithRetry(() => import('@modules/Test/Test')),
    layout: 'clear',
  },

  notFound: {
    path: '*',
    component: () => loadWithRetry(() => import('@modules/pages/PageNotFound')),
  },
} as const;

export const getRoutePathByName = (name: TPage): string => {
  const route = ROUTES[name];

  return route?.path === '*' ? '/' : (route?.path ?? '/');
};

export default ROUTES;
