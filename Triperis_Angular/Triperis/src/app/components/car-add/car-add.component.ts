import { Router } from '@angular/router';
import { CarCreateEdit } from './../../models/carCreate.model';
import { CarsService } from 'src/app/services/cars.service';
import { ToastService } from 'src/app/services/toast.service';
import { CarFormComponent } from './../car-form/car-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { UserDetails } from 'src/app/models/userDetails.model';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  public title = 'Sukurti naują automobilio skelbimą';
  userDetails : UserDetails;

  @ViewChild(CarFormComponent)
  public carForm: CarFormComponent;

  constructor(
    private toastService: ToastService,
    private usersService : UsersService,
    private carsService: CarsService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  createListing(){
    if(this.carForm.form.valid && this.carForm.picUpload.picStatus()){
      var newCar : CarCreateEdit = {
        marke: this.carForm.form.controls.marke.value,
        modelis: this.carForm.form.controls.modelis.value,
        metai: this.carForm.form.controls.metai.value,
        kebuloTipas: this.carForm.form.controls.kebuloTipas.value,
        kuroTipas: this.carForm.form.controls.kuroTipas.value,
        variklioTuris: this.carForm.form.controls.variklioTuris.value,
        galia: this.carForm.form.controls.galia.value,
        defektai: Boolean(this.carForm.form.controls.defektai.value),
        spalva: this.carForm.form.controls.spalva.value,
        pavaruDeze: this.carForm.form.controls.pavaruDeze.value,
        aprasymas: this.carForm.form.controls.aprasymas.value,
        kaina: this.carForm.form.controls.kaina.value,
        vin: this.carForm.form.controls.vin.value.toUpperCase(),
        rida: this.carForm.form.controls.rida.value,
        userId: this.userDetails.id,
        parduotas: false
      };
      //console.log(newCar);
      this.carsService.postCar(newCar).subscribe(success => {
        this.carForm.picUpload.onUpload(success.id);
        this.toastService.open('Skelbimas sukurtas');
        this.router.navigate(['Cars', `${success.id}`]);
        //console.log('CONGRAULATIONS');
      });
    }
    else{
      this.toastService.open('Korektiškai užpildykite visus laukus ir pasirinkite iki 4 nuotraukų');
    }
  }

  getUser() {
    this.usersService.getUserProfile().subscribe(user => {
      this.userDetails = user;
    });
  }

}
