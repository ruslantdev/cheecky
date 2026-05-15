import type {FC} from 'react';
import clsx from 'clsx';
import css from './Header.module.scss';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import useStoreLocale from '@/stores/storeLocale';
import {TLocale} from '@/types';

interface THeaderProps {
  className?: string;
}

const Header: FC<THeaderProps> = ({className}) => {
  const toggleSidebar = useStoreLayoutDefault((s) => s.toggleSidebar);
  const {locale, setLocale} = useStoreLocale();

  return (
    <header className={clsx(css.header, className)}>
      <button onClick={toggleSidebar}>Click sidebar</button>

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
