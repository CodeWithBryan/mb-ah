import { Vector3 } from 'fivem-js';
import Coordinates from '../../shared/interfaces/coordinates';

export const drawText3DMulti = (coords: Coordinates | Vector3, strings: string[], marker = false, noBackground = false, f?: any) => {
    if (!coords) {
        return;
    }

    // Old code had + 0.75 on z
    const { x, y, z } = coords;
    const [ isOnScreen, screenX, screenY ] = World3dToScreen2d(x, y, z);
    const lineCount = strings.length;

    let text = "";
    let longest = 0;

    // Build our string
    strings.forEach(string => {
        if (text !== "") {
            text = `${text}\n`;
        }

        if (string.length > longest) {
            longest = string.length;
        }

        text = `${text}${string}`;
    });

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

        if (f) {
            DrawText(screenX, screenY + 0.01);
        } else {
            DrawText(screenX, screenY);
        }

        const factor = longest / 340
        const length = 0.02 * lineCount;

        if (!noBackground) {
            DrawRect(screenX, screenY + 0.0425, 0.025 + factor, length + 0.01, 41, 11, 41, 68); // Update 455 or replace the whole draw text with whatever you use
        }

        if (marker) {
            DrawMarker(27, x, y, z - 1.25, 0, 0, 0, 0, 0, 0, 1.0, 1.0, 1.0, 255, 255, 255, 255, false, false, 2, false, '', '', false);
        }
    }
};