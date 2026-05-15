import {Suspense, useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import Loader from '@components/Loader';
import {APP_STATUS} from '@constants/app';
import {router} from '@constants/router';
import ErrorBoundary from '@modules/ErrorBoundary';
import Maintenance from '@modules/Maintenance';
import useStoreApp from '@stores/storeApp';
import sleep from '@utils/common';
import logger from '@utils/logger';
import Locale from '@modules/Locale';
import Init from '@modules/Init';
import useStoreProfile from '@stores/storeProfile';
import useStoreLocale from '@stores/storeLocale';
import CONFIG from '@constants/config';

const App = () => {
  const log = logger.module('App');

  const {status: appStatus, setStatus: setAppStatus} = useStoreApp();
  const {isLoaded: isProfileLoaded} = useStoreProfile();
  const {isLoading: isLocaleLoading} = useStoreLocale();

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

      {appStatus === APP_STATUS.error ? (
        <Maintenance />
      ) : (
        <>
          <Init />

          {appStatus === APP_STATUS.initializing && <Loader />}

          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </>
      )}
    </ErrorBoundary>
  );
};

export default App;
