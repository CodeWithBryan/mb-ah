import { sleep } from '../../shared/sleep';
import { punish } from '../../configs/events.json';

const isPedJumpingCheck = async () => {
    if (IsPedJumping(PlayerPedId())) {
        let length = 0;
        let jumping = true;

        while (jumping) {
            length += 1;
            jumping = IsPedJumping(PlayerPedId());
            await sleep(10);
        }

        if (length > 250) {
            emitNet(punish, 'extended_jumping', 'Extended Jumping detected');
        }

        setTimeout(isPedJumpingCheck, 250);
    } else {
        setTimeout(isPedJumpingCheck, 250);
    }
}

isPedJumpingCheck();