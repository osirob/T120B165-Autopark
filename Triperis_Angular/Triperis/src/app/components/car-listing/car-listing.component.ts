import { ImageUrl } from './../../models/imageUrl';
import { ImagesService } from './../../services/images.service';
import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.css']
})
export class CarListingComponent implements OnInit {

  @Input() carId : number;
  car : Car;
  imageUrl : ImageUrl;
  ready : number = 0;
  
  constructor(private carService : CarsService, private imageService : ImagesService) { }

  ngOnInit(): void {
    this.getCar();
    this.getImageUrl();
  }

  getCar() : void{
    this.carService.getCar(this.carId).subscribe(event => {
      this.car = event;
      this.ready++;
    });
  }

  getImageUrl() : void{
    this.imageService.getFirstImageUrl(this.carId).subscribe(event => {
      this.imageUrl = event;
      this.ready++;
    });
  }

}
