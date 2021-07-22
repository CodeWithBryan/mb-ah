import { sleep } from '../../shared/sleep';

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
            emitNet('mb-ah:punish', 'extended_jumping', 'Extended Jumping detected');
        }

        setTimeout(isPedJumpingCheck, 250);
    } else {
        setTimeout(isPedJumpingCheck, 250);
    }
}

isPedJumpingCheck();