import clsx from 'clsx';
import type {FC} from 'react';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import useStoreLocale from '@/stores/storeLocale';
import type {TLocale} from '@/types';
import css from './Header.module.scss';

interface THeaderProps {
  className?: string;
}

const Header: FC<THeaderProps> = ({className}) => {
  const toggleSidebar = useStoreLayoutDefault((s) => s.toggleSidebar);
  const {locale, setLocale} = useStoreLocale();

  return (
    <header className={clsx(css.header, className)}>
      <button type="button" onClick={toggleSidebar}>
        Click sidebar
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
