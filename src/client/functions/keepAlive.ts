import { keepAlive } from '../../configs/events.json';

const KeepAlive = (token: string): void => {
    setInterval(() => {
        emitNet(keepAlive, token);
    }, 20 * 1000);
};

export default KeepAlive;