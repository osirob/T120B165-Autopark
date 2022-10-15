import { ImageUrl } from './../models/imageUrl';
import { Observable, retry } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private baseUrl = 'https://localhost:7289/api/Images'

  constructor(private http: HttpClient) { }

  uploadImage(formdata : FormData, carId : number) : Observable<any> {
    return this.http.post(this.baseUrl + '/Upload' + `/${carId}`, formdata, {reportProgress: true, observe: 'events'});
  }

  getFirstImageUrl(id: number) : Observable<ImageUrl>{
    return this.http.get<ImageUrl>(this.baseUrl + '/GetFirstImage' + `/${id}`);
  }
  
  getCarImages(id: number) : Observable<ImageUrl[]>{
    return this.http.get<ImageUrl[]>(this.baseUrl + '/GetCarImages' + `/${id}`);
  } 

  editImage(formdata : FormData, carId : number) : Observable<any>{
    return this.http.put(this.baseUrl + '/Edit' + `/${carId}`, formdata, {reportProgress: true, observe: 'events'});
  }
}
