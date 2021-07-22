import Players from '../classes/players.class';

onNet('mb-ah:keepAlive', (token: string) => {
    const _source = (global as any).source;
    const player = Players.get(_source);
    
    if (player.keepAliveToken === token) {
        player.lastKeepAlive = Date.now();
        console.log(`Keep Alive Updated for ${token}`);
    }
});

setInterval(() => {
    Players._players.forEach(player => {
        if (Date.now() - player.lastKeepAlive >= 90 * 1000) {
            // We've failed to update our keepAlive in the last 90 seconds, let's go ahead and trigger a failure
            player.failedTokenChecks += 1;
        } else {
            // Reset tokenchecks to 0
            player.failedTokenChecks = 0;
        }
    
        if (player.failedTokenChecks >= 3) {
            // We've got more than 3 failed token checks, trigger a kick event
            emit('mb-ah:punish', 'keep_alive_failed', 'AntiHack Heartbeat Failure');
        }
    });
}, 30 * 1000);
