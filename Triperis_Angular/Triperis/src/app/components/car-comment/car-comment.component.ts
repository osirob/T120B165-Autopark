import { CarComment } from './../../models/comment.model';
import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-car-comment',
  templateUrl: './car-comment.component.html',
  styleUrls: ['./car-comment.component.css']
})
export class CarCommentComponent implements OnInit {

  @Input() comment : CarComment;
  dateCreated : string;
  constructor() { }

  ngOnInit(): void {
    this.dateCreated = formatDate(this.comment.creationDate, 'yyy-MM-dd HH:mm', 'en-US');
  }

}
