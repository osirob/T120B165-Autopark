import { AddComment } from './../models/commentCreate.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  baseUrl = 'https://localhost:7289/api/Comments';

  constructor(private http: HttpClient) { }

  getCommentsById(carId : number) : Observable<CarComment[]>{
    return this.http.get<CarComment[]>(this.baseUrl + `/${carId}`);
  }

  postComment(comment: AddComment): Observable<AddComment>{
    return this.http.post<AddComment>(this.baseUrl, comment);
  }
}
