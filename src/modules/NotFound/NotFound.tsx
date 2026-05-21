import Button from '@components/Button';
import ROUTES from '@constants/route';
import css from '@modules/NotFound/NotFound.module.scss';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

const NotFound = () => {
  const {t} = useTranslation();

  return (
    <div className={css.notFound}>
      <div className={css.notFound__logo}>404</div>

      <div className={css.notFound__title}>
        {t('Oops, something went wrong')}
      </div>

      <div className={css.notFound__desc}>
        {t('Sorry, the page you are looking for does not exist')}
      </div>

      <Button className={css.notFound__action}>
        {t('Go to home page')}

        <Link to={`/${ROUTES.home.path}`} />
      </Button>
    </div>
  );
};

export default NotFound;
