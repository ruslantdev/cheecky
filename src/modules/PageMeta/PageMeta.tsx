import useStoreLayout from '@stores/storeLayout';
import useStoreLocale from '@stores/storeLocale';
import {formatTabTitle} from '@utils/tab';
import {type FC, type PropsWithChildren, useEffect} from 'react';

export const PageMeta: FC<PropsWithChildren> = ({children}) => {
  const isLocaleLoading = useStoreLocale((state) => state.isLoading);
  const locale = useStoreLocale((state) => state.locale);

  const layoutTitle = useStoreLayout((state) => state.title);
  const layoutTablTitle = useStoreLayout((state) => state.tabTitle);

  useEffect(() => {
    if (!isLocaleLoading) {
      let title: string;

      if (layoutTablTitle !== undefined) {
        title = layoutTablTitle;
      } else {
        if (layoutTitle) {
          title = formatTabTitle(layoutTitle);
        } else {
          title = 'Cheecky';
        }
      }

      document.title = title;
    }
  }, [isLocaleLoading, layoutTablTitle, layoutTitle]);

  useEffect(() => {
    if (locale) {
      document.querySelector('html')?.setAttribute('lang', locale);
    }
  }, [locale]);

  return children;
};
