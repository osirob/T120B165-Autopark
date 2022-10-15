import { UserDetails } from 'src/app/models/userDetails.model';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-user-cars',
  templateUrl: './user-cars.component.html',
  styleUrls: ['./user-cars.component.css']
})
export class UserCarsComponent implements OnInit {
  loaded : boolean = false;
  cars: Car[] = [];
  soldCars: Car[] = [];
  userDetails : UserDetails;

  constructor(private carService : CarsService, private router: Router, private usersService : UsersService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getAllCars(){
    this.carService.getCarsByUserId(this.userDetails.id).subscribe(response => {
      this.cars = response;
    });
    this.carService.getSoldCarsByUserId(this.userDetails.id).subscribe(res => {
      this.soldCars = res;
    });

  }

  navigate(car : Car) : void{
    this.router.navigate(['Cars', `${car.id}`]);
  }

  getUser(){
    this.usersService.getUserProfile().subscribe(u => {
      this.userDetails = u;
      this.loaded = true;
      this.getAllCars();
    });
  }

}
