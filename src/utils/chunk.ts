import CONFIG from '@constants/config';

export const loadWithRetry = <T = unknown>(
  loadComponent: () => Promise<{default: T}>
) => {
  return new Promise<{default: T}>((resolve, reject) => {
    const attempt = (remainingRetries: number) => {
      loadComponent()
        .then(resolve)
        .catch((error: Error) => {
          if (remainingRetries <= 0) {
            reject(error);

            return;
          }

          setTimeout(() => {
            attempt(remainingRetries - 1);
          }, CONFIG.chunkRetryDelay);
        });
    };

    attempt(CONFIG.maxChunkRetryAttempts);
  });
};
