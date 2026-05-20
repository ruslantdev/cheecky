import clsx from 'clsx';
import type {FC} from 'react';
import css from './Sidebar.module.scss';

interface TSidebarProps {
  className?: string;
}

const Sidebar: FC<TSidebarProps> = ({className}) => {
  return (
    <div className={clsx(css.sidebar, className)}>
      <div className={css.sidebar__content}>Content</div>
    </div>
  );
};

export default Sidebar;
