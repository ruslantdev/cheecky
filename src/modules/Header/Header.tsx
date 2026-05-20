import clsx from 'clsx';
import type {FC} from 'react';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import useStoreLocale from '@/stores/storeLocale';
import type {TLocale} from '@/types';
import css from './Header.module.scss';
import useStoreScreen from '@/stores/storeScreen';

interface THeaderProps {
  className?: string;
}

const Header: FC<THeaderProps> = ({className}) => {
  const $screen = useStoreScreen();
  const {locale, setLocale} = useStoreLocale();

  // Достаем состояние и явный сеттер
  const sidebar = useStoreLayoutDefault((s) => s.sidebar);
  const setSidebar = useStoreLayoutDefault((s) => s.setSidebar);

  const isMobileDevice = $screen['<460'];

  // Обрабатываем клик локально, опираясь на брейкпоинт экрана
  const handleToggle = () => {
    if (isMobileDevice) {
      // На мобилке переключаем только между hidden и opened
      setSidebar(sidebar === 'opened' ? 'hidden' : 'opened');
    } else {
      // На десктопе/планшете — между collapsed и opened
      setSidebar(sidebar === 'collapsed' ? 'opened' : 'collapsed');
    }
  };

  // Вычисляем текст для кнопки
  let buttonLabel = '';
  if (isMobileDevice) {
    buttonLabel = sidebar === 'opened' ? 'Close menu' : 'Open menu';
  } else {
    buttonLabel =
      sidebar === 'collapsed' ? 'Expand sidebar' : 'Collapse sidebar';
  }

  return (
    <header className={clsx(css.header, className)}>
      <button
        type="button"
        onClick={handleToggle}
        data-sidebar={sidebar}
        data-mobile={isMobileDevice || undefined}
      >
        {buttonLabel}
      </button>

      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as TLocale)}
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
      </select>
    </header>
  );
};

export default Header;
