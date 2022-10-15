import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router : Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(localStorage.getItem('token') != null){
            const clonedRequest = req.clone({
                headers : req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            })
            return next.handle(clonedRequest).pipe(
                tap(
                    success => {},
                    error => {
                        if(error.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/LoginRegister');
                        }
                        else if(error.status == 403){
                            this.router.navigateByUrl('/Forbidden');
                        }
                    }
                )
            )
        } else 
        {
          return next.handle(req.clone());  
        }
    }

}