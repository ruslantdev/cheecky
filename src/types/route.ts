import type {TLazyComponent} from './common';
import type {TLayoutType} from './layout';
import type {TPage} from './page';

export type TRoute = {
  path: string;
  component: TLazyComponent;
  layout?: TLayoutType;
  redirect?: {name: TPage};
  isAdmin?: boolean;
};
