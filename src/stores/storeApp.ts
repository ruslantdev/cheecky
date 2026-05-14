import {create} from 'zustand';
import {APP_STATUS} from '@/constants/app';
import type {TAppStatus} from '@/types';

interface TAppState {
  status: TAppStatus;
  setStatus(status: TAppStatus): void;
}

const useStoreApp = create<TAppState>((set) => ({
  status: APP_STATUS.initializing,
  setStatus: (status) => set({status}),
}));

export default useStoreApp;
