import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit{
  @Input() userName: string = '';
  @Input() displayName: string = '';
  @Input() userId: string = '';
  userLink: string = '';

  ngOnInit(): void {
    this.userLink = `/user/${this.userId}`;
  }
}
