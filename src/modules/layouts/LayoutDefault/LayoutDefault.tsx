import Header from '@modules/Header';
import Sidebar from '@modules/Sidebar';
import {Suspense, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useShallow} from 'zustand/react/shallow';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import useStoreScreen from '@/stores/storeScreen';
import css from './LayoutDefault.module.scss';

const LayoutDefault = () => {
  const $screen = useStoreScreen();

  const {sidebar, setSidebar} = useStoreLayoutDefault(
    useShallow((state) => ({
      sidebar: state.sidebar,
      setSidebar: state.setSidebar,
    }))
  );

  const isMobile = $screen['<460'];
  const isTablet = $screen['<1024'];

  useEffect(() => {
    if (isMobile) {
      setSidebar('hidden');
    } else if (isTablet) {
      setSidebar('collapsed');
    } else {
      setSidebar('opened');
    }
  }, [isMobile, isTablet, setSidebar]);

  return (
    <div className={css.layoutDefault}>
      <Header className={css.layoutDefault__header} />

      <div className={css.layoutDefault__body}>
        {sidebar === 'hidden' ? null : (
          <Sidebar
            className={css.layoutDefault__sidebar}
            collapsed={sidebar === 'collapsed'}
          />
        )}

        <div className={css.layoutDefault__content}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LayoutDefault;
