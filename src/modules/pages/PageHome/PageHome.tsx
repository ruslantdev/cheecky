import {useTranslation} from 'react-i18next';
import {usePageSettings} from '@/hooks/usePageSettings';

export const PageHome = () => {
  const {t} = useTranslation();
  const date = new Date();

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const formattedDate = formatter.format(date);

  usePageSettings({
    subTitle: formattedDate.toUpperCase(),
    title: `${t('Greetings')}!`,
    desc: t('This is your dashboard'),
  });

  return <div style={{height: 2000}}>Home page</div>;
};
