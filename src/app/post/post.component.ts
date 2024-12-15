import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  @Input() userId: string = '';
  @Input() userName: string = '';
  @Input() displayName: string = '';
  @Input() content: string = ''
  userLink: string = '';

  ngOnInit(): void {
    this.userLink = `/user/${this.userId}`;
  }
}
