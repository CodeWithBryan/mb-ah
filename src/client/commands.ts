/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Cfx from 'fivem-js';
import spectate from './functions/spectate';

let god = false;

RegisterCommand(
    'god',
    async (source: number, args: string[]) => {
        SetEntityInvincible(PlayerPedId(), !god);
        SetEntityCanBeDamaged(PlayerPedId(), god);
        god = !god;
    },
    false
);

RegisterCommand(
    'spectate',
    async (source: number, args: string[]) => {
        const [ playerId ] = args;
        spectate(parseInt(playerId, 0) || GetPlayerIndex());
    },
    false
);