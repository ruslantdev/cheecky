import zergModule from 'zerg';
import type LoggerClass from 'zerg/dist/Logger';

export const getZerg = () => {
  return zergModule && 'default' in zergModule
    ? (zergModule.default as typeof zergModule)
    : (zergModule as typeof zergModule);
};

const zerg = getZerg();

const logger: LoggerClass = zerg.createLogger();

export default logger;
