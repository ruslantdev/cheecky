import type {TLayoutType, TPage} from '@/types';
import type {TLazyComponent} from '../common';

declare module 'react-router' {
  interface TRouteHandle {
    layout?: TLayoutType;
    component?: TLazyComponent;
    name?: TPage;
    isAdmin?: boolean;
    redirect?: {name: TPage};
  }
}
