import { ImageUploadComponent } from './../images/image-upload/image-upload.component';
import { BrandsService } from './../../services/brands.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  @Input() title: string;
  public form: FormGroup;
  
  @ViewChild(ImageUploadComponent)
  public picUpload: ImageUploadComponent;

  public carsInfo : any;
  public models : any;
  public years : number[];
  public colors : string[];
  public bodies : string[];
  public fuelType: string[];
  public gearboxType: string[];

  constructor(
    private fb: FormBuilder,
    private brandsService: BrandsService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getCarsInfo();
  }

  getCarsInfo(): void{
    this.carsInfo = this.brandsService.getInfo();
    this.years = this.brandsService.getYears();
    this.colors = this.brandsService.getColors();
    this.bodies = this.brandsService.getBodies();
    this.fuelType = this.brandsService.getFuelTypes();
    this.gearboxType = this.brandsService.getGearboxTypes();
  }

  initializeForm() : void{
    this.form = this.fb.group({
      marke: ['', [Validators.required]],
      modelis: new FormControl({value: '', disabled: true}),
      metai: ['', [Validators.required]],
      spalva: ['', [Validators.required]],
      kebuloTipas: ['', [Validators.required]],
      variklioTuris: ['', [Validators.required]],
      kuroTipas: ['', [Validators.required]],
      galia: ['', [Validators.required]],
      pavaruDeze: ['', [Validators.required]],
      rida: ['', [Validators.required]],
      vin: ['', [Validators.required]],
      defektai: ['', [Validators.required]],
      kaina: ['', [Validators.required]],
      aprasymas: ['', [Validators.required]]
    }) as FormGroup;
  }

  onChange($event) : void{
    if(this.form.controls.marke.value){
      this.models = this.getModelList(this.form.controls.marke.value);
      this.form.controls.modelis.enable();
    }
  }

  getModelList(brandParam: string){
    for(var i of this.carsInfo){
      if(i.brand === brandParam){
        return i.models;
      }
    }
  }
}
