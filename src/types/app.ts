import type {APP_STATUS} from '@/constants/app';

export type TAppStatus = (typeof APP_STATUS)[keyof typeof APP_STATUS];
