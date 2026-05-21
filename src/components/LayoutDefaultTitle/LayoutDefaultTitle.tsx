import css from '@components/LayoutDefaultTitle/LayoutDefaultTitle.module.scss';
import clsx from 'clsx';
import type {FC} from 'react';

interface TLayoutDefaultTitleProps {
  className?: string;
  title?: string;
  subTitle?: string;
  desc?: string;
}

export const LayoutDefaultTitle: FC<TLayoutDefaultTitleProps> = ({
  className,
  title,
  subTitle,
  desc,
}) => {
  return (
    <div className={clsx(css.layoutDefaultTitle, className)}>
      {subTitle && (
        <div className={css.layoutDefaultTitle__subtitle}>{subTitle}</div>
      )}

      <div className={css.layoutDefaultTitle__title}>{title}</div>

      {desc && <div className={css.layoutDefaultTitle__desc}>{desc}</div>}
    </div>
  );
};
