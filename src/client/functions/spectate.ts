let enabled = false;

const spectate = (targetId: number): void => {
    const playerPed = GetPlayerPed(-1);
    const playerId = GetPlayerIndex();
    const target = GetPlayerFromServerId(targetId);
    const targetPed = GetPlayerPed(target);
    const name = GetPlayerName(targetId);
    
    enabled = playerId === target || target === -1 ? false : !enabled;

    const [ x, y, z ] = GetEntityCoords(targetPed, false);

    if (enabled) {
        console.log(`Started spectating ${name}`);

        RequestCollisionAtCoord(x, y, z);
		NetworkSetInSpectatorMode(true, targetPed);

		SetEntityInvincible(playerPed, true);
		SetEntityVisible(playerPed, false, false);
		SetEveryoneIgnorePlayer(playerPed, true);
		SetEntityCollision(playerPed, false, false);
    } else {
        console.log(`Stopped spectating ${name}`);

        RequestCollisionAtCoord(x, y, z);
		NetworkSetInSpectatorMode(false, targetPed);

		SetEntityInvincible(playerPed, false);
		SetEntityVisible(playerPed, true, false);
		SetEveryoneIgnorePlayer(playerPed, false);
		SetEntityCollision(playerPed, true, true);
    }
}

export default spectate;