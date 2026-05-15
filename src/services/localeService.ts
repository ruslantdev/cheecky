import CONFIG from '@constants/config';
import {type TLocale} from '@/types';

class Locale {
  validateLocale(locale: unknown): locale is TLocale {
    const {locales} = CONFIG;
    const availableLocales = Object.values(locales) as string[];

    return typeof locale === 'string' && availableLocales.includes(locale);
  }
}

const locale = new Locale();

export default locale;
