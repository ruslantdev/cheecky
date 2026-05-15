import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const {t} = useTranslation();

  return (
    <div style={{background: '#9f9f9f', height: 2000}}>
      {t('Hello')}
      Home page
      <Link to="/about">TO about</Link>
    </div>
  );
};

export default Home;
