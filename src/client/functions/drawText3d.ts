import { Vector3 } from 'fivem-js';
import Coordinates from '../../shared/interfaces/coordinates';

const drawText3D = (coords: Coordinates | Vector3, text: string, marker = false): void => {
    if (!coords) {
        return;
    }

    // Old code had + 0.75 on z
    const { x, y, z } = coords;
    const [ isOnScreen, screenX, screenY ] = World3dToScreen2d(x, y, z);

    if (isOnScreen) {
        SetTextScale(0.35, 0.35);
        SetTextFont(4);
        SetTextProportional(true);
        SetTextColour(255, 255, 255, 255);
        SetTextDropshadow(0, 0, 0, 0, 255);
        SetTextEdge(2, 0, 0, 0, 150);
        SetTextDropShadow();
        SetTextEntry("STRING");
        SetTextCentre(true);
        AddTextComponentString(text);
        DrawText(screenX, screenY);

        const factor = text.length / 340;
        DrawRect(screenX, screenY + 0.0125, 0.015 + factor, 0.03, 41, 11, 41, 68);

        if (marker) {
            DrawMarker(27, x, y, z - 1.25, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 255, 255, 255, false, false, 2, false, '', '', false);
        }
    }
};

export default drawText3D;