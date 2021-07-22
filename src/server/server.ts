import sendWebhook from './functions/webhook';
import Players from './classes/players.class';

require('./functions/keepAlive');

on('playerConnecting', (name) => {
  console.log('Player Connection:', name);
});

onNet('mb-ah:initPlayer', () => {
  const _source = (global as any).source;

  Players.add(_source);
});

onNet('mb-ah:punish', (type: string, message: string, src?: number, args?: { name: string, value: string }[]) => {
  const _source = src ? src : (global as any).source;
  const player = Players.get(_source);

  sendWebhook('main', 'Punishment Served', message, [
    {
      name: 'Type',
      value: type,
    }, {
      name: 'SteamID',
      value: player.steam,
    },
    {
      name: 'Identifiers',
      value: `${player.identifiers.map(i => `\n${i}`)}`,
      inline: false,
    },
    ...args,
  ]);

  console.log(`${player.steam} ${type} ${message}`);
});

// Detections
require('./detections/entityCreation');

// Server initalized... Let's tell discord :)

sendWebhook('main', `General Alert`, `MrBoolean's AntiHack Intialized`);