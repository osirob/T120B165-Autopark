import { ToastService } from 'src/app/services/toast.service';
import { CommentsService } from './../../services/comments.service';
import { UserDetails } from './../../models/userDetails.model';
import { UsersService } from 'src/app/services/users.service';
import { CarsService } from 'src/app/services/cars.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { ImagesService } from 'src/app/services/images.service';
import { ImageUrl } from 'src/app/models/imageUrl';
import { formatDate } from '@angular/common';
import { CarComment } from 'src/app/models/comment.model';
import { AddComment } from 'src/app/models/commentCreate.model';

@Component({
  selector: 'app-car-detailed-view',
  templateUrl: './car-detailed-view.component.html',
  styleUrls: ['./car-detailed-view.component.css']
})
export class CarDetailedViewComponent implements OnInit {
  car: Car = new Car();
  images : ImageUrl[];
  seller : UserDetails;
  comments : CarComment[];
  noComments : boolean = true;
  dateCreated : string;
  dateUpdated : string;
  ready : number = 0;
  defects : string;

  //USER STUFF
  loggedIn: boolean;
  role: string;
  user: UserDetails;

  //Comment
  comment: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private imageService : ImagesService,
    private userService: UsersService,
    private commentService : CommentsService,
    private toastService : ToastService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getCar();
    this.getUserInfo();
  }

  getCar(): void{
    var id = String(this.route.snapshot.paramMap.get('id'));
    this.carsService.getCar(Number(id)).subscribe(event => {
      this.car = event;
      this.dateUpdated = formatDate(this.car.atnaujintasData, 'yyy-MM-dd HH:mm', 'en-US');
      this.dateCreated = formatDate(this.car.sukurimoData, 'yyy-MM-dd HH:mm', 'en-US');

      if(this.car.defektai === true){
        this.defects = 'Taip';
      }
      else{
        this.defects ='Ne';
      }
      //this.car.aprasymas = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

      this.getImages();
      this.getSeller();
      this.getComments();
    });
  }

  getImages(): void {
    this.imageService.getCarImages(this.car.id).subscribe(event => {
      this.images = event;
      this.ready++;
    });
  }

  getSeller(): void {
    this.userService.getUserById(this.car.userId).subscribe(event => {
      this.seller = event;
      this.ready++;
    });
  }

  getComments(): void{
    this.commentService.getCommentsById(this.car.id).subscribe(
      event => {
        this.comments = event;
        this.noComments = false;
        this.ready++;
      },
      error => {
        this.ready++;
      }
      );
  }

  getComments2(){
    this.commentService.getCommentsById(this.car.id).subscribe(
      event => {
        this.comments = event;
        this.noComments = false;
      });
  }

  getUserInfo(){
    this.loggedIn = this.userService.ifLoggedIn();
    this.role = this.userService.getRole();
    if(this.loggedIn){
      this.userService.getUserProfile().subscribe(user => {
        this.user = user;
      });
    }
  }

  postComment(){
    var newComment : AddComment = {
      text: this.comment,
      userName: this.user.userName,
      carId: this.car.id,
      userId: this.user.id
    };

    this.comment = '';
    this.commentService.postComment(newComment).subscribe(event => {
      this.getComments2();
      this.toastService.open('Komentaras sukurtas');
    });
  }

  changeTag(){
    this.carsService.changeStatus(this.car.id).subscribe(event => {
      this.carsService.getCar(this.car.id).subscribe(car => {
        this.car = car;
      });
      this.toastService.open('Būsena buvo pakeista');
    });
  }

  openEdit(){
    this.router.navigate(['Cars/Edit', `${this.car.id}`]);
  }

  delete(){
    this.carsService.deleteCar(this.car.id).subscribe(res => {
      this.toastService.open('Skelbimas buvo ištrintas');
      this.router.navigate(['UserCars']);
    });
  }

}
