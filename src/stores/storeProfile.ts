import {create} from 'zustand';
import type {TLocale, TProfile} from '@/types';
import sleep from '@/utils/common';

interface TProfileStore {
  isLoading: boolean;
  isLoaded: boolean;
  profile?: TProfile | null;
  getProfile: () => void;
}

const initialValues = {
  isLoading: false,
  isLoaded: false,
  profile: null,
};

const mockProfile = {
  name: 'John Doe',
  email: 'johndoe@mail.com',
  locale: 'ru' as TLocale,
};

const useStoreProfile = create<TProfileStore>((set) => ({
  ...initialValues,

  async getProfile() {
    set({isLoading: true});

    try {
      await sleep(5000);
      set({
        profile: mockProfile,
      });
      set({isLoaded: true});
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set({isLoading: false});
    }
  },
}));

export default useStoreProfile;
