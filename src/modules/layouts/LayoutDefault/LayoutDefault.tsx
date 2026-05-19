import Header from '@modules/Header';
import Sidebar from '@modules/Sidebar';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import css from './LayoutDefault.module.scss';

const LayoutDefault = () => {
  const $layoutDefault = useStoreLayoutDefault();

  return (
    <div className={css.layoutDefault}>
      <Sidebar
        className={css.layoutDefault__sidebar}
        collapsed={$layoutDefault.isSidebarCollapsed}
      />

      <main className={css.layoutDefault__main}>
        <Header className={css.layoutDefault__header} />

        <div className={css.layoutDefault__content}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default LayoutDefault;
