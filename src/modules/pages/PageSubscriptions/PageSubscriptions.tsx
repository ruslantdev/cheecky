import ROUTES from '@constants/route';
import {usePageSettings} from '@hooks/usePageSettings';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

export const PageSubscriptions = () => {
  const {t} = useTranslation();

  usePageSettings({
    title: t('Subscriptions'),
  });

  return (
    <div>
      Subs page
      <Link to={ROUTES.home.path}>{t('Home')}</Link>
    </div>
  );
};
