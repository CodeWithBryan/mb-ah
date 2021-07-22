import vehicles from '../../configs/vehicles.json';

const vehicleHashes = vehicles.map(v => GetHashKey(v));

setInterval(() => {
    const ped = GetPlayerPed(-1);
    let vehicle;

    if (IsPedInAnyVehicle(ped, false)) {
        vehicle = GetVehiclePedIsIn(ped, false);
    }

    if (ped && vehicle) {
        if (GetPedInVehicleSeat(vehicle, -1) === ped) {
            const model = GetEntityModel(vehicle);
            if (vehicleHashes.includes(model)) {
                DeleteVehicle(vehicle);
                emitNet('mb-ah:punish', 'blacklisted_vehicle', 'Blacklisted Vehicle');
            }
        }
    }
}, 500);