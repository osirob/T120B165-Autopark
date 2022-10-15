import { UserDetails } from './../models/userDetails.model';
import { LoginUser } from './../models/loginUser.model';
import { RegisterUser } from './../models/registerUser.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'https://localhost:7289/api/AppUser';
  private authenticatedUrl ='https://localhost:7289/api/AppUserAuth';
  private loggedInSource = new BehaviorSubject<boolean>(localStorage.getItem('token') === null ? false : true);
  loggedInCurrent = this.loggedInSource.asObservable();

  constructor(private http : HttpClient) { 
    
  }

  registerUser(newUser: RegisterUser) : Observable<RegisterUser> {
    return this.http.post<RegisterUser>(this.baseUrl + '/Register', newUser);
  }

  //Returns error or JWT token
  login(user: LoginUser) : Observable<any>{
    return this.http.post<LoginUser>(this.baseUrl + '/Login', user);
  }

  logout() : void{
    localStorage.removeItem('token');
    this.setLogout();
  }

  setLogin(){
    this.loggedInSource.next(true);
  }

  setLogout(){
    this.loggedInSource.next(false);
  }

  getUserProfile() : Observable<UserDetails> {
    return this.http.get<UserDetails>(this.authenticatedUrl);
  }

  getUserById(id : number) : Observable<UserDetails>{
    return this.http.get<UserDetails>(this.authenticatedUrl + '/GetUserById' + `/${id}`);
  }

  roleMatch(allowedRoles : Array<string>): boolean {
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
    var userRole = payload.role;
    allowedRoles.forEach(element => {
      if(userRole == element){
        isMatch = true;
      }
    });
    return isMatch;
  }

  getRole(): string {
    if(localStorage.getItem('token') != null){
      var payload = JSON.parse(window.atob(localStorage.getItem('token')!.split('.')[1]));
      return payload.role;
    }
    else{
      return 'None';
    }
  }

  ifLoggedIn(){
    if(localStorage.getItem('token') != null){
      return true;
    }
    else{
      return false;
    }
  }
}