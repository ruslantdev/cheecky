import Loader from '@components/Loader';
import {APP_STATUS} from '@constants/app';
import {LAYOUT_CONTENT_TYPE} from '@constants/layout';
import useStoreApp from '@stores/storeApp';
import useStoreLayout from '@stores/storeLayout';
import useStoreLocale from '@stores/storeLocale';
import {loadWithRetry} from '@utils/chunk';
import logger from '@utils/logger';
import {type ComponentType, useEffect, useState} from 'react';
import {type RouteHandle, useMatches, useNavigation} from 'react-router-dom';
import {useShallow} from 'zustand/react/shallow';
import type {TLayoutType} from '@/types';
import type {TLazyComponent} from '@/types/common';

const log = logger.module('Layout');

const layoutComponents: Record<TLayoutType, TLazyComponent> = {
  default: () => loadWithRetry(() => import('@modules/layouts/LayoutDefault')),
  clear: () => loadWithRetry(() => import('@modules/layouts/LayoutClear')),
};

const Layout = () => {
  const setAppStatus = useStoreApp((state) => state.setStatus);

  const {layoutContentType, isLayoutLoading, isLayoutGlobalLoading} =
    useStoreLayout(
      useShallow((state) => ({
        layoutContentType: state.contentType,
        isLayoutLoading: state.isLoading,
        isLayoutGlobalLoading: state.isGlobalLoading,
      }))
    );

  const isLocaleLoading = useStoreLocale((state) => state.isLoading);
  const navigation = useNavigation();

  const matches = useMatches();
  const handle = matches[matches.length - 1]?.handle as RouteHandle | undefined;

  const [LayoutShell, setLayoutShell] = useState<ComponentType | null>(null);
  const [layoutLoading, setLayoutLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const t = window.setTimeout(() => {
      if (!cancelled) {
        setLayoutLoading(true);
      }
    }, 50);

    const loadLayout = async () => {
      const layoutType = (handle?.layout as TLayoutType) || 'default';

      if (!layoutComponents[layoutType]) {
        setLayoutShell(null);
        setLayoutLoading(false);
        return;
      }

      try {
        const data = await layoutComponents[layoutType]();

        if (!cancelled) {
          setLayoutShell(() => data.default);
        }
      } catch (error) {
        log.error("Couldn't load Layout chunk", {error});
        setAppStatus(APP_STATUS.error);
      } finally {
        window.clearTimeout(t);

        if (!cancelled) {
          setLayoutLoading(false);
        }
      }
    };

    void loadLayout();

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [handle?.layout, setAppStatus]);

  const showContentLoader = layoutContentType !== LAYOUT_CONTENT_TYPE.loader;
  const isPageLoading = navigation.state === 'loading';

  return (
    <>
      {LayoutShell && <LayoutShell />}

      <Loader show={showContentLoader && (isLayoutLoading || isPageLoading)} />

      <Loader show={layoutContentType === LAYOUT_CONTENT_TYPE.loader} />

      <Loader
        show={isLocaleLoading || layoutLoading || isLayoutGlobalLoading}
      />
    </>
  );
};

export default Layout;
