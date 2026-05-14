import {getZerg} from '../index';
import {consoleBrowserColorful} from 'zerg/dist/transports';

const zerg = getZerg();

const transportToConsole = zerg.createListener({
  handler: consoleBrowserColorful,
});

export default transportToConsole;
