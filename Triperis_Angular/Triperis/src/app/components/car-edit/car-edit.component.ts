import { ToastService } from 'src/app/services/toast.service';
import { CarsService } from 'src/app/services/cars.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarFormComponent } from '../car-form/car-form.component';
import { CarCreateEdit } from 'src/app/models/carCreate.model';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  title: string = 'Redaguoti automobilio skelbimą';

  @ViewChild(CarFormComponent)
  public carForm: CarFormComponent;

  car: Car = new Car();
  defects: string;
  
  constructor(
    private route: ActivatedRoute,
    private carService: CarsService,
    private router: Router,
    private toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.getCar();
  }

  getCar(){
    var id = String(this.route.snapshot.paramMap.get('id'));
    this.carService.getCar(Number(id)).subscribe(event => {
      this.car = event;
      this.patchForm();
    });
  }

  patchForm(){
    this.carForm.form.patchValue(this.car);
    if(this.car.defektai){
      this.defects = 'true';
    }
    else{
      this.defects = 'false';
    }
    this.carForm.form.controls.defektai.setValue(this.defects);
  }

  editListing(){
    if(this.carForm.form.valid){
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
        userId: 1234, //this is here to avoid errors, api doesnt care about useId when editing
        parduotas: false
      };
      
      this.carService.putCar(newCar, this.car.id).subscribe(success => {
        if(this.carForm.picUpload.picStatus()){
          this.carForm.picUpload.onEdit(this.car.id);
        }
        this.toastService.open('Pakeitimai išsaugoti');
        this.router.navigate(['Cars', `${this.car.id}`]);
      }, err => {this.toastService.open('Patikrinkite laukus')});
    }
    else{
      this.toastService.open('Korektiškai užpildykite visus laukus');
    }
  }

  goBack(){
    this.router.navigate(['Cars', `${this.car.id}`]);
  }

}
