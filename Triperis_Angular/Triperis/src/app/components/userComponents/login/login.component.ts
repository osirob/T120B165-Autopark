import { LoginUser } from './../../../models/loginUser.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    userName : '',
    password : ''
  }

  constructor(private fb: FormBuilder, private usersService: UsersService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('/');
    }
  }


  login() : void {
    var login : LoginUser = {
      userName : this.formModel.userName,
      password : this.formModel.password,
    };

    this.usersService.login(login).subscribe(
      //success case
      (response) => {
        localStorage.setItem('token', response.token);
        this.usersService.setLogin();
        this.router.navigateByUrl('/'); //navigates to car listings
      },
      
      //failure
      err => {
        if(err.status == 400){
          this.toast.open('Neteisingi prisijungimo duomenys');
        }
      }
    );
  }
}
