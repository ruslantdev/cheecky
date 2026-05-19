import type {TLayoutType, TPage} from '@/types';

export type TRouteHandle = {
  layout?: TLayoutType;
  name?: TPage;
  isAdmin?: boolean;
  redirect?: {name: TPage};
};
