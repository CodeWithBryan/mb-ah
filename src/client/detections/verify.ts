import { punish } from '../../configs/events.json';

onNet(`${GetCurrentResourceName()}.verify`, () => {
    emitNet(punish, 'verify_probe', 'Mod Menu Detected');
});
