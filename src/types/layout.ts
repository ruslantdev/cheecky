import {LAYOUT_CONTENT_TYPE, LAYOUT_TYPE} from '@/constants/layout';
import type {valueof} from '@/types';

export type TLayoutType = valueof<typeof LAYOUT_TYPE>;
export type TLayoutContentType = valueof<typeof LAYOUT_CONTENT_TYPE>;
