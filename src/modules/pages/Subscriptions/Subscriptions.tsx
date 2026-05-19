import ROUTES from '@constants/route';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const Subscriptions = () => {
  const {t} = useTranslation();

  return (
    <div>
      Subs page
      <Link to={ROUTES.home.path}>{t('Home')}</Link>
    </div>
  );
};

export default Subscriptions;
