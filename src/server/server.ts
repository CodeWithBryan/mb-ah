import Players from './classes/players.class';

require('./functions/keepAlive');

on('playerConnecting', (name) => {
  console.log('Player Connection:', name);
});

onNet('mb-ah:initPlayer', () => {
  const _source = (global as any).source;

  Players.add(_source);
});

onNet('mb-ah:punish', (type: string, message: string) => {
  const _source = (global as any).source;
  const player = Players.get(_source);

  console.log(`${player.steam} ${type} ${message}`);
});