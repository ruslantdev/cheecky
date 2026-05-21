import {usePageSettings} from '@hooks/usePageSettings';
import NotFound from '@modules/NotFound';
import {useTranslation} from 'react-i18next';

export const PageNotFound = () => {
  const {t} = useTranslation();

  usePageSettings({
    tabTitle: `404 - ${t('Page not found')} | Cheecky`,
    title: '',
  });

  return <NotFound />;
};
