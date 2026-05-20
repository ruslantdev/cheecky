import {SCREEN_SIZE} from '@constants/screen';
import {ObjectKeys} from '@utils/object';
import type {TScreenSize} from '@/types';

export const defineScreens = () => {
  const windowWidth = window.innerWidth;
  const data: Record<TScreenSize, boolean> = {} as Record<TScreenSize, boolean>;

  ObjectKeys(SCREEN_SIZE).forEach((key) => {
    data[key] = SCREEN_SIZE[key](windowWidth);
  });

  return data;
};
