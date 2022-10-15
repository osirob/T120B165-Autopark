import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private cars = [
    {brand: 'Alfa Romeo', models: ['MiTo', 'Giulietta', '4C', '4C Spider', 'Giulia', 'Stelvio']},
    {brand: 'Aston Martin', models: ['DB11', 'DBS Superleggera', 'DBX', 'Vantage', 'Valkyrie', 'V12 Speedster', 'Victor']},
    {brand: 'Audi', models: ['A1', 'A4', 'A5', 'A6', 'A8', 'e-tron GT', 'R8', 'Q5', 'Q7', 'Q8', 'S4', 'S6', 'S8']},
    {brand: 'Bentley', models: ['Continental GT', 'Flying Spur', 'Bentayga', 'Continental']},
    {brand: 'BMW', models: ['3 Serija', '4 Serija', '5 Serija', '7 Serija', 'X5', 'X6']},
    {brand: 'Cadillac', models: ['CT5', 'Escalade', 'XT5']},
    {brand: 'Chevrolet', models: ['Bolt', 'Spark', 'Monza', 'Camaro', 'Corvette', 'Colorado', 'Suburban']},
    {brand: 'Citroën', models: ['C3', 'C4', 'Berlingo', 'Jumper']},
    {brand: 'Dodge', models: ['Attitude', 'Challenger', 'Charger', 'Neon', 'Durango']},
    {brand: 'Ferrari', models: ['812 Superfast', 'Portofino', 'Roma', 'F8']},
    {brand: 'Fiat', models: ['500', 'Panda', 'Pulse', 'Ducato', '595']},
    {brand: 'Ford', models: ['Fiesta', 'Focus', 'Mondeo', 'Escort', 'Mustang', 'Bronco', 'Explorer', 'F Serija']},
    {brand: 'Lexus', models: ['CT', 'IS', 'RX', 'NX', 'LX']},
    {brand: 'Mercedes-Benz', models: ['A Klasė', 'C Klasė', 'E Klasė', 'S Kasė', 'G Klasė', 'AMG GT', 'Vito', 'Sprinter']},
    {brand: 'Nissan', models: ['Leaf', 'Juke', 'Murano', 'Pathfinder', 'Patrol', 'GT-R', 'Z']},
    {brand: 'Tesla', models: ['Model 3', 'Model S', 'Model X', 'Model Y']},
    {brand: 'Toyota', models: ['Camry', 'Corolla', 'Yaris', 'Land Cruiser', 'Rav4', 'Hilux', 'Supra', 'GR86']}
  ];

  private years : number[] = [];
  private colors : string[] = ['Balta', 'Juoda', 'Ruda', 'Pilka', 'Geltona', 'Oranžinė', 'Raudona', 'Violetinė', 'Rausva', 'Mėlyna', 'Žalia', 'Žydra'];
  private bodies : string[] = ['Sedanas', 'Hečbekas', 'Universalas', 'Visureigis', 'Kabrioletas', 'Limuzinas', 'Pikapas', 'Kupė', 'Komercinis'];
  private fuel : string[] = ['Dyzelinas', 'Benzinas', 'Benzinas / Dujos', 'Benzinas / Elektra', 'Elektra'];
  private gearbox : string[] = ['Automatinė', 'Mechaninė'];

  constructor() { }

  getInfo(){
    return this.cars;
  }

  private setYears(): void {
    for (var i = 1970; i < 2023; i++){
      this.years.push(i);
    }
  }

  getYears(){
    this.setYears();
    return this.years;
  }

  getColors(){
    return this.colors.sort();
  }

  getBodies(){
    return this.bodies.sort();
  }

  getFuelTypes(){
    return this.fuel;
  }

  getGearboxTypes(){
    return this.gearbox;
  }
}
