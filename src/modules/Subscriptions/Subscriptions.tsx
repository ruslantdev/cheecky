import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const Subscriptions = () => {
  const {t} = useTranslation();

  return (
    <div>
      Subs page
      <Link to="/">{t('Home')}</Link>
    </div>
  );
};

export default Subscriptions;
