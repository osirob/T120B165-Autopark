import { CarCreateEdit } from './../models/carCreate.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  baseUrl = 'https://localhost:7289/api/Cars';

  constructor(private http: HttpClient) { }

  //Get all cars
  getAllCars() : Observable<Car[]>{
    return this.http.get<Car[]>(this.baseUrl);
  }

  getCar(id: number) : Observable<Car>{
    return this.http.get<Car>(this.baseUrl + `/${id}`);
  }

  postCar(car: CarCreateEdit) : Observable<Car>{
    return this.http.post<Car>(this.baseUrl, car);
  }

  changeStatus(id: number) : Observable<Car>{
    return this.http.put<Car>(this.baseUrl + '/ChangeTag', id);
  }

  putCar(car: CarCreateEdit, id: number) : Observable<Car>{
    return this.http.put<Car>(this.baseUrl + `/${id}`, car);
  }

  getCarsByUserId(userId: number): Observable<Car[]>{
    return this.http.get<Car[]>(this.baseUrl + '/UserCars' + `/${userId}`);
  }

  getSoldCarsByUserId(userId: number): Observable<Car[]>{
    return this.http.get<Car[]>(this.baseUrl + '/UserCarsSold' + `/${userId}`);
  }

  deleteCar(carId: number) : Observable<Car>{
    return this.http.delete<Car>(this.baseUrl + `/${carId}`);
  }
}
