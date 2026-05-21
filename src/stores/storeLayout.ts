import {create} from 'zustand';
import {LAYOUT_CONTENT_TYPE} from '@/constants/layout';
import type {TLayoutContentType} from '@/types';

interface TLayoutStore {
  isGlobalLoading: boolean;
  isLoading: boolean;
  contentType: TLayoutContentType;
  tabTitle?: string;
  title?: string;
  subTitle?: string;
  desc?: string;

  setGlobalLoading: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setContentType: (type: TLayoutContentType) => void;
  setTitle: (title?: string) => void;
  setTabTitle: (title?: string) => void;
  setSubTitle: (title?: string) => void;
  setDesc: (desc?: string) => void;

  reset: () => void;
}

const initialState = {
  isGlobalLoading: false,
  isLoading: false,
  contentType: LAYOUT_CONTENT_TYPE.component,
  tabTitle: undefined,
  title: undefined,
  subTitle: undefined,
  desc: undefined,
};

const useStoreLayout = create<TLayoutStore>((set) => ({
  ...initialState,

  setGlobalLoading: (value) => set({isGlobalLoading: value}),

  setLoading: (value) => set({isLoading: value}),

  setContentType: (type) => set({contentType: type}),

  setTitle: (title) => set({title}),

  setTabTitle: (tabTitle) => set({tabTitle}),

  setSubTitle: (subTitle) => set({subTitle}),

  setDesc: (desc) => set({desc}),

  reset: () => set(initialState),
}));

export default useStoreLayout;
