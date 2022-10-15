import {  Router } from '@angular/router';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ImageUrl } from 'src/app/models/imageUrl';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {

  @Input() images : ImageUrl[];
  public screenWidth: number;
  public imageWidth: number;
  public imageHeight: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // 70 then 65
    this.screenWidth = Math.round((window.innerWidth)/100*70);
    this.imageWidth = Math.round(this.screenWidth/100*65);
    this.imageHeight = Math.round(this.imageWidth/4*3);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.imageWidth = Math.round(this.screenWidth/100*65);
    this.imageHeight = Math.round(this.imageWidth/4*3);
  }

}
