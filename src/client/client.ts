import KeepAlive from "./functions/keepAlive";
import { initPlayer, playerInitialized } from '../configs/events.json';

require('./commands');

setImmediate(() => {
  emitNet(initPlayer);
});

onNet(playerInitialized, (token: string) => {
  KeepAlive(token);
});

// Detections

require('./detections/esx');
require('./detections/verify');
require('./detections/longJump');
require('./detections/preventions');
require('./detections/vehicleBlacklist');