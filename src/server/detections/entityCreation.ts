import props from '../../configs/props.json';

const models = props.map(p => GetHashKey(p));

on('entityCreating', (entity: number) => {
    const src = NetworkGetEntityOwner(entity);
    const entID = NetworkGetNetworkIdFromEntity(entity);

    if (GetEntityType(entity) != 0) {
        const model = GetEntityModel(entity);
        if (models.includes(model)) {
            console.log('model', model);
            console.log('Src: ', src);
            console.log('entId: ', entID);

            CancelEvent();
        }
    }
});