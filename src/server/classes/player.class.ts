import { Md5 } from 'ts-md5/dist/md5';
import getIdentifiers from "../functions/getIdentifiers";

class Player {
    handle: string;
    steam: string;
    identifiers: string[];
    joinTime: number;

    // Keep Alive Status
    keepAliveToken: string;
    lastKeepAlive: number;
    failedTokenChecks = 0;

    constructor(handle: string) {
        const { steam, identifiers } = getIdentifiers(handle);

        this.handle = handle;
        this.steam = steam;
        this.identifiers = identifiers;
        this.joinTime = Date.now();
        this.lastKeepAlive = Date.now();
        this.keepAliveToken = Md5.hashStr(`${this.steam}${this.joinTime}`);

        this.initialized();
    }

    initialized(): void {
        console.log('Initialized ', this.handle);
        emitNet('mb-ah:playerInitialized', this.handle, this.keepAliveToken);
    }
}

export default Player;