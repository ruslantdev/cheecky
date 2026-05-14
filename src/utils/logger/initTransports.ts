import logger from '@/utils/logger/index';
import consoleDevTransport from '@/utils/logger/transports/consoleDevTransport';

const log = logger.module('LoggerTransport');

log.info('Init transports');

const consoleTransport = consoleDevTransport;

logger.addListener(consoleTransport);
