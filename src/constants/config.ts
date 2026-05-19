import {LOCALES} from '@constants/locale';
import {stringToNumber} from '@utils/common';
import {envStringToBoolean} from '@utils/env';

const BUILD_ENV = env.BUILD_ENV ?? 'development';
const APP_ENV = env.APP_ENV ?? 'development';

const CONFIG = {
  isBuildEnvDev: BUILD_ENV === 'development',
  isBuildEnvProd: BUILD_ENV === 'production',
  isAppEnvDev: APP_ENV === 'development',
  isAppEnvProd: APP_ENV === 'production',

  version: env.VERSION || '0.0.1',
  branch: env.BRANCH || '',
  commit: env.COMMIT || '',
  buildDate: env.BUILD_DATE || '',
  buildEnv: BUILD_ENV,
  appEnv: APP_ENV,

  apiUrl: env.API_URL ?? 'test.local',
  locales: LOCALES,
  defaultLocale: LOCALES.en,
  logInUrl: env.LOG_IN_URL ?? 'https://test.local/login',
  logOutUrl: env.LOG_OUT_URL ?? 'https://test.local/',

  maxChunkRetryAttempts: stringToNumber(env.MAX_CHUNK_RETRY_ATTEMPTS) ?? 10,
  chunkRetryDelay: stringToNumber(env.CHUNK_RETRY_DELAY) ?? 1000,

  requestCacheTTL: stringToNumber(env.REQUEST_CACHE_TTL) ?? 3 * 1000,
  requestTimeout: stringToNumber(env.REQUEST_TIMEOUT) ?? 60 * 1000,
  requestRetryAttempts: stringToNumber(env.REQUEST_RETRY_ATTEMPTS) ?? 3,
  requestRetryDelay: stringToNumber(env.REQUEST_RETRY_DELAY) ?? 5,

  sentryEnabled: envStringToBoolean(env.SENTRY_ENABLED),
  sentryDsn: env.SENTRY_DSN ?? '',
  sentryEnv: env.SENTRY_ENV ?? 'unspecified',
} as const;

export default CONFIG;
