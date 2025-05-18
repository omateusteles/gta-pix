RegisterCommand('coords', () => {
    const ped = PlayerPedId();
    const coords = GetEntityCoords(ped, true);
    const heading = GetEntityHeading(ped);
    
    const x = coords[0].toFixed(2);
    const y = coords[1].toFixed(2);
    const z = coords[2].toFixed(2);
    const h = heading.toFixed(2);
    
    console.log(`[COORDS] X: ${x}, Y: ${y}, Z: ${z}, H: ${h}`);
}, false);

RegisterCommand('teleport', () => {
    const ped = PlayerPedId();

    SetEntityCoords(ped, -54, -805, 44, false, false, false, false);
}, false);