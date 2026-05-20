import Loader from '@components/Loader';
import {APP_STATUS} from '@constants/app';
import CONFIG from '@constants/config';
import ErrorBoundary from '@modules/ErrorBoundary';
import Init from '@modules/Init';
import Locale from '@modules/Locale';
import Maintenance from '@modules/Maintenance';
import Screen from '@modules/Screen';
import useStoreApp from '@stores/storeApp';
import useStoreLocale from '@stores/storeLocale';
import useStoreProfile from '@stores/storeProfile';
import logger from '@utils/logger';
import {useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import {useShallow} from 'zustand/react/shallow';
import router from '@/react-plugins/router';

const App = () => {
  const log = logger.module('App');

  const {status: appStatus, setStatus: setAppStatus} = useStoreApp(
    useShallow((state) => ({
      status: state.status,
      setStatus: state.setStatus,
    }))
  );

  const isProfileLoaded = useStoreProfile((state) => state.isLoaded);
  const isLocaleLoading = useStoreLocale((state) => state.isLoading);

  useEffect(() => {
    if (isProfileLoaded && !isLocaleLoading) {
      setAppStatus(APP_STATUS.initialized);
    }
  }, [isLocaleLoading, isProfileLoaded, setAppStatus]);

  useEffect(() => {
    const {version, branch, commit, buildDate, buildEnv, appEnv} = CONFIG;

    log.info('Start app', {
      version,
      branch,
      commit,
      buildDate,
      buildEnv,
      appEnv,
    });
  }, [log]);

  return (
    <ErrorBoundary>
      <Locale />
      <Screen />

      {appStatus === APP_STATUS.error ? (
        <Maintenance />
      ) : (
        <>
          <Init />

          <Loader
            show={appStatus === APP_STATUS.initializing}
            background="#fff"
          />

          {appStatus === APP_STATUS.initialized && (
            <RouterProvider router={router} />
          )}
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
