import type {valueof} from '@/types';

export const ObjectKeys = <T extends Record<string, unknown>>(obj: T): (keyof T)[] => {
  return Object.keys(obj);
};

export const ObjectEntries = <T extends object>(obj: T): [keyof T, valueof<T>][] => {
  return Object.entries(obj) as [keyof T, valueof<T>][];
};
