import ROUTES from '@constants/route';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const Home = () => {
  const {t} = useTranslation();

  return (
    <div style={{background: '#9f9f9f', height: 2000}}>
      {t('Hello')}
      Home page
      <Link to={ROUTES.subscriptions.path}>Subscriptions</Link>
    </div>
  );
};

export default Home;
