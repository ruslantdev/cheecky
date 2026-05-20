import SidebarToggler from '@modules/SidebarToggler';
import clsx from 'clsx';
import type {FC} from 'react';
import useStoreLocale from '@/stores/storeLocale';
import type {TLocale} from '@/types';
import css from './Header.module.scss';

interface THeaderProps {
  className?: string;
}

const Header: FC<THeaderProps> = ({className}) => {
  const {locale, setLocale} = useStoreLocale();

  return (
    <header className={clsx(css.header, className)}>
      <SidebarToggler />

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
