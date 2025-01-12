import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { calculateDiffBetweenDates } from '../../shared/util/date.util';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  @Input() postId: string = ''
  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() displayName: string = '';
  @Input() content: string = ''
  @Input() createdAt!: string;
  date: string = '';
  userLink: string = '';
  postLink: string = '';


  ngOnInit(): void {
    this.userLink = `/user/${this.userId}`;
    this.postLink = `/post/${this.postId}`;
    const _date = new Date(this.createdAt);
    this.date = calculateDiffBetweenDates(_date);
  }
}
