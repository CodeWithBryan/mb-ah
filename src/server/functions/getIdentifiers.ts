
const getIdentifiers = (handle: string): { steam: string, identifiers: string[] } => {
    const identifiers = {
        steam: null,
        identifiers: [],
    };

    for (let index = 0; index < GetNumPlayerIdentifiers(handle)-1; index++) {
        const identifier = GetPlayerIdentifier(handle, index);
        if (identifier.includes('steam:')) {
            identifiers.steam = identifier;
        } else {
            identifiers.identifiers.push(identifier);
        }
    }
    
    return identifiers;
}

export default getIdentifiers;