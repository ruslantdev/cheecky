import clsx from 'clsx';
import type {FC} from 'react';
import css from './Sidebar.module.scss';

interface TSidebarProps {
  className?: string;
  collapsed?: boolean;
}

const Sidebar: FC<TSidebarProps> = ({className, collapsed}) => {
  return (
    <div
      className={clsx(
        css.sidebar,
        collapsed && css.sidebar_collapsed,
        className
      )}
    >
      <div className={css.sidebar__header}>Header</div>
      <div className={css.sidebar__content}>Content</div>
    </div>
  );
};

export default Sidebar;
