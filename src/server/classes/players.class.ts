import Player from './player.class';

class Players {
  _players: Player[];

  constructor() {
    this._players = [];
  }

  add(handle: string){
    const player = new Player(handle);

    this._players.push(player);
  }

  get(id): Player {
    return this._players.find(d => d.handle === id);
  }
}
  
const instance = new Players();
Object.freeze(instance);
  
export default instance;