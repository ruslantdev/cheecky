import type {CSSProperties, FC} from 'react';
import css from './Loader.module.scss';

interface TLoaderProps {
  show?: boolean;
  size?: number;
  background?: string;
  color?: string;
}

const Loader: FC<TLoaderProps> = ({
  show = false,
  size = 24,
  background = 'rgba(255, 255, 255, 0.9)',
  color = '#178d6a',
}) => {
  if (!show) {
    return null;
  }

  const style: CSSProperties = {
    background,
    color,
  };

  const innerStyle: CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <div className={css.loader} style={style}>
      <div className={css.loader__inner} style={innerStyle} />
    </div>
  );
};

export default Loader;
