import ROUTES from '@constants/route';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const NotFound = () => {
  const {t} = useTranslation();

  return (
    <div>
      <h1>404</h1>
      <p>{t('Page not found')}</p>
      <Link to={ROUTES.home.path}>Home</Link>
    </div>
  );
};

export default NotFound;
