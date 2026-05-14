import type {FC} from 'react';
import clsx from 'clsx';
import css from './Header.module.scss';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';

interface THeaderProps {
  className?: string;
}

const Header: FC<THeaderProps> = ({className}) => {
  const toggleSidebar = useStoreLayoutDefault((s) => s.toggleSidebar);

  return (
    <header className={clsx(css.header, className)}>
      <button onClick={toggleSidebar}>Click sidebar</button>
    </header>
  );
};

export default Header;
