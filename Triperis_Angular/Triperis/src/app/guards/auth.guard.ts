import { UsersService } from 'src/app/services/users.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private userService : UsersService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('token') != null ){
        let requiredRoles = route.data['permittedRoles'] as Array<string>;
        if(requiredRoles){
          if(this.userService.roleMatch(requiredRoles)){
            return true;
          } else {
            this.router.navigateByUrl('/Forbidden');
            return false;
          }
        }

        return true;
      }
      else {
        this.router.navigateByUrl('/LoginRegister');
        return false;
      }
  }
  
}
