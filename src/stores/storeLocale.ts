// import CONFIG from '@constants/config';
// import {TLocale} from '@/types';
// import LOCAL_STORAGE_KEY from '@constants/localStorage';
// import {create} from 'zustand';
// import localeService from '@/services/localeService';
// import useStoreProfile from '@stores/storeProfile';

// const STORAGE_KEY = LOCAL_STORAGE_KEY.locale;

// const saveLocale = (locale: TLocale) => {
//   localStorage.setItem(STORAGE_KEY, locale);
// };

// interface TLocaleStore {
//   locale: TLocale;
//   isLoading: boolean;
//   setLocale: (newLocale?: TLocale) => Promise<void>;
//   setLoading: (isLoading: boolean) => void;
//   initLocale: () => void;
//   syncLoading: () => void;
// }

// const useStoreLocale = create<TLocaleStore>((set, get) => ({
//   locale: CONFIG.defaultLocale,
//   isLoading: false,

//   setLocale: async (newLocale?: TLocale) => {
//     const target =
//       newLocale && localeService.validateLocale(newLocale)
//         ? newLocale
//         : CONFIG.defaultLocale;

//     set({locale: target});

//     saveLocale(target);
//   },

//   setLoading: (isLoading: boolean) => {
//     set({isLoading});
//   },

//   initLocale: () => {
//     const profileStore = useStoreProfile.getState();
//     if (profileStore.isLoading) return;

//     let tempLocale: TLocale | undefined;
//     const profileLocale = profileStore.profile?.locale;
//     const localStorageLocale = localStorage.getItem(
//       STORAGE_KEY
//     );

//     if (
//       localStorageLocale &&
//       localeService.validateLocale(localStorageLocale)
//     ) {
//       tempLocale = localStorageLocale;
//     } else if (profileLocale && localeService.validateLocale(profileLocale)) {
//       tempLocale = profileLocale;
//     }

//     tempLocale ??= CONFIG.defaultLocale;
//     saveLocale(tempLocale);

//     if (tempLocale !== get().locale) {
//       set({locale: tempLocale});
//     }
//   },

//   syncLoading: () => {
//     const profileLoading = useStoreProfile.getState().isLoading;
//     set({isLoading: profileLoading});
//   },
// }));

// export default useStoreLocale;

import CONFIG from '@constants/config';
import LOCAL_STORAGE_KEY from '@constants/localStorage';
import localeService from '@/services/localeService';
import useStoreProfile from '@stores/storeProfile';
import {create} from 'zustand';
import type {TLocale} from '@/types';

const STORAGE_KEY = LOCAL_STORAGE_KEY.locale;

interface TLocaleStore {
  locale: TLocale;
  isLoading: boolean;
  setLocale: (newLocale?: TLocale) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  initLocale: () => void;
  syncLoading: () => void;
}

const useStoreLocale = create<TLocaleStore>((set, get) => ({
  locale: CONFIG.defaultLocale,
  isLoading: false,

  setLoading: (isLoading: boolean) => {
    set({isLoading});
  },

  setLocale: async (newLocale?: TLocale) => {
    const target =
      newLocale && localeService.validateLocale(newLocale)
        ? newLocale
        : CONFIG.defaultLocale;

    set({locale: target});

    if (!newLocale) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, target);
    }
  },

  initLocale: () => {
    const profileStore = useStoreProfile.getState();

    if (profileStore.isLoading) {
      return;
    }

    let tempLocale: TLocale | undefined;

    const localStorageLocale = localStorage.getItem(
      STORAGE_KEY
    ) as TLocale | null;

    if (
      localStorageLocale &&
      localeService.validateLocale(localStorageLocale)
    ) {
      tempLocale = localStorageLocale;
    }

    if (!tempLocale) {
      const profileLocale = profileStore.profile?.locale;

      if (profileLocale && localeService.validateLocale(profileLocale)) {
        tempLocale = profileLocale;
      }
    }

    if (!tempLocale) {
      tempLocale = CONFIG.defaultLocale;
    }

    if (tempLocale !== get().locale) {
      set({locale: tempLocale});
    }
  },

  syncLoading: () => {
    const profileLoading = useStoreProfile.getState().isLoading;

    set({isLoading: profileLoading});
  },
}));

export default useStoreLocale;
