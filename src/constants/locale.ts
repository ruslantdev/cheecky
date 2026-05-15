import type {TLocale} from '@/types';

export const LOCALES = {
  en: 'en',
  ru: 'ru',
} as const;

export const LOCALE_LABEL_KEY: Record<TLocale, string> = {
  en: 'English',
  ru: 'Russian',
} as const;
