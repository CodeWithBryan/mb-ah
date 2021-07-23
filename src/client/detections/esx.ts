import { esx } from '../../configs/general.json';
import { punish } from '../../configs/events.json';

let detected = false;

on('esx:getSharedObject', (cb: (...params) => void) => {
    // If we aren't using ESX, this shouldn't get called...
    if (!esx) {
        // We aren't using ESX

        if (detected) {
            CancelEvent();
            cb(null);
            return;
        }

        emitNet(punish, 'esx_request_detection', 'Blacklisted Events');
        detected = true;
        cb(null);
    }
});