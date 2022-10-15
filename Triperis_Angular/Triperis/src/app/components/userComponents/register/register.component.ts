import { RegisterUser } from './../../../models/registerUser.model';
import { ToastService } from './../../../services/toast.service';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private toast: ToastService) { 
    
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void{
    this.form = this.fb.group({
      userName: ['', [Validators.minLength(6), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    }, {validator: this.comparePasswords}) as FormGroup;
  }

  comparePasswords(form: FormGroup){
    var confirmPassword = form.get('confirmPassword');

    if(confirmPassword?.errors == null || 'passwordMismatch' in confirmPassword.errors){
      if(form.get('password')?.value != confirmPassword?.value){
        confirmPassword?.setErrors({passwordMismatch: true});
      } else {
        confirmPassword?.setErrors(null);
      }
    }
  }

  addNewUser() : void{
    if(this.form.valid){
      var newUser : RegisterUser = {
        userName : this.form.controls.userName.value,
        email : this.form.controls.email.value,
        password : this.form.controls.password.value,
        role : '',
        phone: this.form.controls.phone.value
      };

      this.usersService.registerUser(newUser).subscribe(() => {
        this.form.reset();
        this.toast.open('Registracija sėkminga');
      });
    }
  }

  goBack() : void{
    //Implement the redirect after there is somewhere to go
  }
}
