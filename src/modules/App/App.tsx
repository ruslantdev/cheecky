import {Suspense, useEffect} from 'react';
import {RouterProvider} from 'react-router-dom';
import Loader from '@/components/Loader';
import {APP_STATUS} from '@/constants/app';
import {router} from '@/constants/router';
import ErrorBoundary from '@/modules/ErrorBoundary';
import Maintenance from '@/modules/Maintenance';
import useStoreApp from '@/stores/storeApp';
import sleep from '@/utils/common';
import logger from '@/utils/logger';

const App = () => {
  const log = logger.module('App');

  const $app = useStoreApp();

  useEffect(() => {
    const initializeApp = async () => {
      await sleep(1000);
      console.log('sleep ended');

      $app.setStatus(APP_STATUS.initialized);
    };

    initializeApp();
  }, []);

  useEffect(() => {
    log.info('Start app', {version: '0.0'});
  }, [log]);

  return (
    <ErrorBoundary>
      {$app.status === APP_STATUS.error ? (
        <Maintenance />
      ) : (
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default App;
