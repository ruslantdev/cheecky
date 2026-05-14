import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Loader from '@components/Loader';
import Header from '@modules/Header';
import Sidebar from '@modules/Sidebar';
import css from './LayoutDefault.module.scss';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';

const LayoutDefault = () => {
  const $layoutDefault = useStoreLayoutDefault();

  return (
    <div className={css.layoutDefault}>
      <Sidebar
        className={css.layoutDefault__sidebar}
        collapsed={$layoutDefault.isSidebarCollapsed}
      />

      <main className={css.layoutDefault__main}>
        <Suspense fallback={<Loader />}>
          <Header className={css.layoutDefault__header} />

          <div className={css.layoutDefault__content}>
            <Outlet />
          </div>
        </Suspense>
      </main>
    </div>
  );
};

export default LayoutDefault;
