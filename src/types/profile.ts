import type {TLocale} from '@/types';

export interface TProfile {
  name?: string;
  email?: string;
  locale?: TLocale;
  is_admin?: boolean;
}
