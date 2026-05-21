import css from '@components/Menu/Menu.module.scss';
import {MenuItem, type TMenuItem} from '@components/MenuItem/MenuItem';
import clsx from 'clsx';
import type {FC} from 'react';

interface TMenuProps {
  className?: string;
  items: TMenuItem[];
}

export const Menu: FC<TMenuProps> = ({className, items}) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={clsx(css.menu, className)}>
      {items.map((item, i) => {
        const key = `${i}`;

        return <MenuItem key={key} {...item} />;
      })}
    </div>
  );
};
