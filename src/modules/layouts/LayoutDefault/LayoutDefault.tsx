import Header from '@modules/Header';
import Sidebar from '@modules/Sidebar';
import clsx from 'clsx';
import {Suspense, useCallback, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import useStoreScreen from '@/stores/storeScreen';
import css from './LayoutDefault.module.scss';

const LayoutDefault = () => {
  const $screen = useStoreScreen();
  const isSidebarOpen = useStoreLayoutDefault((state) => state.isOpen);
  const setSidebarOpen = useStoreLayoutDefault((state) => state.setIsOpen);

  const isMobile = $screen['<768'];

  const handleMenuItemClick = useCallback(() => {
    if (isMobile && isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, isSidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile, setSidebarOpen]);

  return (
    <div className={css.layoutDefault}>
      <Header className={css.layoutDefault__header} />

      <div className={css.layoutDefault__body}>
        <Sidebar
          className={clsx(
            css.layoutDefault__sidebar,
            isSidebarOpen && css.layoutDefault__sidebar_open
          )}
        />

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
