import * as Cfx from 'fivem.js';
import { Vehicle } from 'fivem.js';

RegisterCommand('car', async (source: string, args: string[]) => {
    let carModel;
  
    if (args.length > 0) {
      carModel = new Cfx.Model(args[0]);
    }
  
    let vehicle;
    if (carModel != null) {
      vehicle = await Cfx.World.createVehicle(carModel, Cfx.Game.PlayerPed.Position);
    } else {
      vehicle = await Cfx.World.createRandomVehicle(Cfx.Game.PlayerPed.Position, 4);
    }
  
    Cfx.Game.PlayerPed.setIntoVehicle(vehicle as Vehicle, Cfx.VehicleSeat.Driver);
  }, false);
