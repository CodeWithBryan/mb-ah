import { sleep } from "../../shared/sleep";

setTick(async () => {
    // Anti Infinite Ammo
    SetPedInfiniteAmmoClip(PlayerPedId(), false);

    // Anti Invincibility
	SetEntityInvincible(PlayerPedId(), false);
	SetEntityCanBeDamaged(PlayerPedId(), true);

    // Anti Invisible
	ResetEntityAlpha(PlayerPedId());
	
    // Anti Speedhack
    const falling = IsPedFalling(PlayerPedId());
	const ragdoll = IsPedRagdoll(PlayerPedId());
	const parachuting = GetPedParachuteState(PlayerPedId());
    
    if (parachuting >= 0 || ragdoll || falling) {
        SetEntityMaxSpeed(PlayerPedId(), 80.0);
    } else {
        SetEntityMaxSpeed(PlayerPedId(), 7.1);
    }

    await sleep(100);
});