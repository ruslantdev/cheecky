import type {FC} from 'react';
import css from './Maintenance.module.scss';

interface TMaintenanceProps {
  onClick?: () => void;
}

export const Maintenance: FC<TMaintenanceProps> = ({onClick}) => {
  return (
    <div className={css.maintenance}>
      {/*<Logo className={css.maintenance__logo} />*/}
      Cheecky-Logo
      <div className={css.maintenance__title}>Currently under maintenance</div>
      <div className={css.maintenance__desc}>
        We regret the inconvenience caused
      </div>
      <button type="button" onClick={onClick}>
        Refresh page
      </button>
    </div>
  );
};
