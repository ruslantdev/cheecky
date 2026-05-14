import {createLogger} from 'vite';

const logger = createLogger();

logger.info = (message) => {
  if (!message.trim()) {
    return;
  }

  console.log(message);
};

logger.clearScreen = () => {};

export default logger;
