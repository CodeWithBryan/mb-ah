import KeepAlive from "./functions/keepAlive";

require('./commands');

setImmediate(() => {
  emitNet('mb-ah:initPlayer');
});

onNet('mb-ah:playerInitialized', (token: string) => {
  KeepAlive(token);
});

// Detections

require('./detections/verify');
require('./detections/longJump');
require('./detections/preventions');
require('./detections/vehicleBlacklist');