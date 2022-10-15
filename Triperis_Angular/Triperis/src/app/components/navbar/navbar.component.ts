import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/userDetails.model';
import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn : boolean;
  role: string;
  user: UserDetails;
  constructor(private usersService : UsersService, private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  logout() : void {
    this.usersService.logout();
    this.router.navigate(['']);
  }

  checkLogin() : void {
    this.usersService.loggedInCurrent.subscribe(x => {
      this.loggedIn = x;
      this.role = this.usersService.getRole();
      this.getDetails();
    });
  }

  getDetails():void {
    this.usersService.getUserProfile().subscribe(details => {
      this.user = details;
    });
  }
}
