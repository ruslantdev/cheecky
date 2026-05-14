import '@/utils/logger/initTransports';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import App from '@modules/App';
import logger from '@/utils/logger';

const log = logger.module('Init');

window.addEventListener('error', (event) => {
  log.error('Window error', event);

  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  log.error('Window unhandledrejection', event);

  event.preventDefault();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
