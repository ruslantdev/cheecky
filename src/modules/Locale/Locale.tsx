import logger from '@utils/logger';
import {type FC, type ReactNode, useEffect} from 'react';
import {useShallow} from 'zustand/react/shallow';
import CONFIG from '@/constants/config';
import LOCAL_STORAGE_KEY from '@/constants/localStorage';
import i18n from '@/react-plugins/locale';
import useStoreLocale from '@/stores/storeLocale';
import useStoreProfile from '@/stores/storeProfile';
import type {TLocale} from '@/types';
import {loadWithRetry} from '@/utils/chunk';

const log = logger.module('Locale');

const localeLoaders = import.meta.glob<{default: Record<string, unknown>}>([
  '../../i18n/*.json',
  '!../../i18n/en.json',
]);

const loadLocaleMessages = (locale: TLocale) => {
  const loader = localeLoaders[`../../i18n/${locale}.json`];

  if (!loader) {
    return Promise.reject(new Error(`Locale "${locale}" is not available`));
  }

  return loadWithRetry(loader);
};

interface Props {
  children?: ReactNode;
}

export const Locale: FC<Props> = ({children}) => {
  const {locale, initLocale, setLocaleLoading} = useStoreLocale(
    useShallow((state) => ({
      locale: state.locale,
      initLocale: state.initLocale,
      setLocaleLoading: state.setLoading,
    }))
  );

  const isProfileLoading = useStoreProfile((state) => state.isLoading);
  const profileLocale = useStoreProfile((state) => state.profile?.locale);

  useEffect(() => {
    initLocale();
  }, [initLocale, isProfileLoading, profileLocale]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === LOCAL_STORAGE_KEY.locale) {
        initLocale();
      }
    };
    const syncLocale = () => initLocale();
    const syncVisibleLocale = () => {
      if (document.visibilityState === 'visible') {
        initLocale();
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', syncLocale);
    document.addEventListener('visibilitychange', syncVisibleLocale);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', syncLocale);
      document.removeEventListener('visibilitychange', syncVisibleLocale);
    };
  }, [initLocale]);

  useEffect(() => {
    let isActive = true;

    const applyLocale = async () => {
      if (locale === CONFIG.defaultLocale) {
        await i18n.changeLanguage(CONFIG.defaultLocale);
        setLocaleLoading(false);
        return;
      }

      const timer = window.setTimeout(() => setLocaleLoading(true), 50);

      try {
        const messages = await loadLocaleMessages(locale);

        if (!isActive) return;

        if (!i18n.hasResourceBundle(locale, 'translation')) {
          i18n.addResourceBundle(
            locale,
            'translation',
            messages.default,
            true,
            true
          );
        }
        await i18n.changeLanguage(locale);
      } catch (error) {
        if (!isActive) return;

        await i18n.changeLanguage(CONFIG.defaultLocale);

        log.error(`Couldn't load ${String(locale).toUpperCase()} locale`, {
          error,
        });
        log.info(`The default locale is used (${CONFIG.defaultLocale})`);
      } finally {
        window.clearTimeout(timer);
        if (isActive) {
          setLocaleLoading(false);
        }
      }
    };

    void applyLocale();

    return () => {
      isActive = false;
    };
  }, [locale, setLocaleLoading]);

  return <>{children}</>;
};
