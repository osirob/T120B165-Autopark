import { Router } from '@angular/router';
import { Car } from './../../models/car.model';
import { CarsService } from './../../services/cars.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  loaded : boolean = false;
  cars: Car[] = [];

  constructor(private carService : CarsService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(){
    this.carService.getAllCars().subscribe(response => {
      this.cars = response;
      this.loaded = true;
    });
  }

  navigate(car : Car) : void{
    this.router.navigate(['Cars', `${car.id}`]);
  }
}
