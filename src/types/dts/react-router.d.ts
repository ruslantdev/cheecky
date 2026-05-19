import type {TRouteHandle} from '../routeHandle';

declare module 'react-router' {
  type RouteHandle = TRouteHandle;
}
