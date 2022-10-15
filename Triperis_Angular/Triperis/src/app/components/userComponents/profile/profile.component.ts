import { UserDetails } from './../../../models/userDetails.model';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails : UserDetails;

  constructor(private usersService : UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserProfile().subscribe(
      response => {
        console.log(response);
        this.userDetails = response;
      },
      err => {console.log(err)}
    );
  }

}
