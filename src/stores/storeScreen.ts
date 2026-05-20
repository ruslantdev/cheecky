import {create} from 'zustand';
import {defineScreens} from '@utils/screen';
import {ObjectKeys} from '@utils/object';
import type {TScreenSize} from '@/types';

interface TScreenStore {
  [key: string]: any;

  define: () => void;
  init: () => void;
  cleanup: () => void;
}

let resizeListener: (() => void) | null = null;

const initialState = defineScreens();

const useStoreScreen = create<TScreenStore>((set, get) => ({
  ...initialState,

  define: () => {
    const data = defineScreens();

    set(data);
  },

  init: () => {
    get().define();

    if (resizeListener) {
      window.removeEventListener('resize', resizeListener);
    }

    resizeListener = get().define;
    window.addEventListener('resize', resizeListener);
  },

  cleanup: () => {
    if (resizeListener) {
      window.removeEventListener('resize', resizeListener);
      resizeListener = null;
    }
  },
}));

export default useStoreScreen;
