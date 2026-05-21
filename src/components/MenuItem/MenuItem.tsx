import css from '@components/MenuItem/MenuItem.module.scss';
import {ReactComponent as IconMinus} from '@icons/minus.svg';
import {ReactComponent as IconPlus} from '@icons/plus.svg';
import clsx from 'clsx';
import {
  type FC,
  type FunctionComponent,
  type MouseEvent,
  type SVGProps,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {Link} from 'react-router-dom';

export interface TMenuItem {
  className?: string;
  title: string;
  path?: string;
  icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  subItems?: TMenuItem[];
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const MenuItem: FC<TMenuItem> = ({
  className,
  title,
  path,
  icon: Icon,
  subItems,
  isActive,
  disabled,
  onClick,
}) => {
  const [isSubItemsOpen, setIsSubItemsOpen] = useState(false);

  const hasSubItems = useMemo(() => {
    return !!subItems?.length;
  }, [subItems?.length]);

  const isLink = useMemo(() => {
    return !!path && !isActive;
  }, [isActive, path]);

  const handleClick = () => {
    if (!isLink && hasSubItems) {
      setIsSubItemsOpen((prev) => !prev);
    }

    onClick?.();
  };

  const handleTogglerClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (hasSubItems) {
        e.preventDefault();
        e.stopPropagation();
        setIsSubItemsOpen(!isSubItemsOpen);
      }
    },
    [hasSubItems, isSubItemsOpen]
  );

  const Wrapper = isLink ? Link : 'div';
  const wrapperProps = isLink ? {to: path} : {};

  return (
    <>
      {/* @ts-expect-error: Wrapper can be either 'div' or React Router 'Link' which introduces dynamic props strictness conflict */}
      <Wrapper
        {...wrapperProps}
        className={clsx(
          css.menuItem,
          disabled && css.menuItem_disabled,
          isActive && css.menuItem_active,
          !disabled && (isLink || hasSubItems) && css.menuItem_interactive,
          className
        )}
        onClick={handleClick}
      >
        {Icon && (
          <div className={css.menuItemIcon}>
            <Icon className={css.menuItemIcon__icon} />
          </div>
        )}

        <div className={css.menuItem__title}>{title}</div>

        {hasSubItems && (
          <button
            type="button"
            className={clsx(css.menuItem__toggler, css.menuItemToggler)}
            onClick={handleTogglerClick}
            disabled={disabled}
          >
            {isSubItemsOpen ? (
              <IconMinus className={css.menuItemToggler__icon} />
            ) : (
              <IconPlus className={css.menuItemToggler__icon} />
            )}
          </button>
        )}
      </Wrapper>
    </>
  );
};
