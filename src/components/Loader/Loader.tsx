import css from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={css.loader}>
      <div className={css.loader__inner} />
    </div>
  );
};

export default Loader;
