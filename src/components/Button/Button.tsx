import Loader from '@components/Loader';
import clsx from 'clsx';
import {
  type FunctionComponent,
  type ReactNode,
  type SVGProps,
  useMemo,
} from 'react';
import {ucFirst} from '@/utils/string';
import css from './Button.module.scss';

export type TButtonColor =
  | 'primary'
  | 'white'
  | 'gray'
  | 'link'
  | 'whiteLightgrayOutlined'
  | 'clear';

export interface TButtonProps {
  className?: string;
  children?: ReactNode;
  height?: number;
  color?: TButtonColor;
  uppercase?: boolean;
  fontWeight?: number;
  loading?: boolean;
  disabled?: boolean;
  wide?: boolean;
  stable?: boolean;
  space?: number;
  type?: 'button' | 'submit';
  preIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  postIcon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  preIconClass?: string;
  postIconClass?: string;
  square?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FunctionComponent<TButtonProps> = ({
  className,
  children,
  height = 36,
  color = 'primary',
  uppercase = false,
  fontWeight = 500,
  loading = false,
  disabled = false,
  wide = false,
  stable = false,
  space = 16,
  type = 'button',
  preIcon: PreIcon,
  postIcon: PostIcon,
  preIconClass,
  postIconClass,
  square = false,
  onClick,
}) => {
  const isIconOnly = useMemo(() => {
    const hasIcon = PreIcon || PostIcon;
    const hasChildren = !!children;
    return hasIcon && !hasChildren;
  }, [PreIcon, PostIcon, children]);

  const buttonClasses = useMemo(() => {
    return clsx(
      css.button,
      css[`button_color${ucFirst(color)}`],
      uppercase && css['button_uppercase'],
      disabled && css['button_disabled'],
      stable && css['button_stable'],
      wide && css['button_wide'],
      square && css['button_square'],
      loading && css['button_loading'],
      isIconOnly && css['button_iconOnly'],
      className
    );
  }, [
    color,
    uppercase,
    disabled,
    stable,
    wide,
    square,
    loading,
    isIconOnly,
    className,
  ]);

  const buttonStyles = useMemo(() => {
    if (isIconOnly) {
      return {
        minHeight: `${height}px`,
        minWidth: `${height}px`,
        height: `${height}px`,
        width: `${height}px`,
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        padding: '8px',
        gap: 0,
      };
    }

    return {
      minHeight: `${height}px`,
      paddingRight: square ? 0 : `${space}px`,
      paddingLeft: square ? 0 : `${space}px`,
      fontWeight,
    };
  }, [height, space, square, fontWeight, isIconOnly]);

  const loaderProps = useMemo(() => {
    switch (color) {
      case 'primary':
        return {background: '#178d6a', color: '#fff'};
      case 'white':
        return {background: '#fff', color: '#2b312c'};
      case 'gray':
        return {background: '#2b312c', color: '#fff'};
      default:
        return {background: '#178d6a', color: '#fff'};
    }
  }, [color]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      type={type}
      style={buttonStyles}
      onClick={handleClick}
    >
      {PreIcon && (
        <div className={css.button__iconWrapper}>
          <PreIcon className={preIconClass} />
        </div>
      )}

      {children && <span>{children}</span>}

      {PostIcon && (
        <div className={css.button__iconWrapper}>
          <PostIcon className={postIconClass} />
        </div>
      )}

      {loading && (
        <Loader
          show={loading}
          size={16}
          background={loaderProps.background}
          color={loaderProps.color}
        />
      )}
    </button>
  );
};
