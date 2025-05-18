import { addChatMessage } from './utils';

export let isInBankArea = false;

const BANK_COORDS = {
    x: -54.80,
    y: -805.00,
    z: 44.00,
    radius: 2.0
};

setTick(() => {
    Wait(0)

    const ped = PlayerPedId();
    const coords = GetEntityCoords(ped, true);
    
    const distance = GetDistanceBetweenCoords(coords[0], coords[1], coords[2], BANK_COORDS.x, BANK_COORDS.y, BANK_COORDS.z, true);
    
    if (distance <= BANK_COORDS.radius) {
        if (!isInBankArea) {
            isInBankArea = true;
            addChatMessage("[PIX] Para realizar transferências PIX, entre em sua conta e faça a solicitação");
        }
    } else {
        isInBankArea = false;
    }
});