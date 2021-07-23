import props from '../../configs/props.json';
import { punish } from '../../configs/events.json';

const models = {};

props.forEach(p => models[GetHashKey(p)] = p);

on('entityCreated', (entity: number) => {
    const src = NetworkGetEntityOwner(entity);
    // const entID = NetworkGetNetworkIdFromEntity(entity);

    if (GetEntityType(entity) != 0) {
        const model = GetEntityModel(entity);
        if (models[model]) {
            emit(punish, 'blacklisted_entity', 'Blacklisted Entity Spawned', src, [{
                name: 'Model',
                value: `(${model}) ${models[model]}`
            }]);

            DeleteEntity(entity);
        }
    }
});