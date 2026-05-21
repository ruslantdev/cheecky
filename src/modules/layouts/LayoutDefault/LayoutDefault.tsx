import Header from '@modules/Header';
import Sidebar from '@modules/Sidebar';
import clsx from 'clsx';
import {Suspense, useCallback, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import useStoreLayout from '@/stores/storeLayout';
import useStoreScreen from '@/stores/storeScreen';
import css from './LayoutDefault.module.scss';
import LayoutDefaultTitle from '@components/LayoutDefaultTitle';
import {useShallow} from 'zustand/react/shallow';

const LayoutDefault = () => {
  const $screen = useStoreScreen();

  const {
    title: layoutTitle,
    subTitle: layoutSubTitle,
    desc: layoutDesc,
  } = useStoreLayout(
    useShallow((state) => ({
      title: state.title,
      subTitle: state.subTitle,
      desc: state.desc,
    }))
  );

  const isSidebarOpen = useStoreLayoutDefault((state) => state.isOpen);
  const setSidebarOpen = useStoreLayoutDefault((state) => state.setIsOpen);

  const isMobile = $screen['<768'];

  // const handleMenuItemClick = useCallback(() => {
  //   if (isMobile && isSidebarOpen) {
  //     setSidebarOpen(false);
  //   }
  // }, [isMobile, isSidebarOpen, setSidebarOpen]);

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
            {(layoutDesc || layoutTitle || layoutSubTitle) && (
              <LayoutDefaultTitle
                className={css.layoutDefaultTitle}
                title={layoutTitle}
                subTitle={layoutSubTitle}
                desc={layoutDesc}
              />
            )}

            <div className={css.layoutDefault__main}>
              <Outlet />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default LayoutDefault;
