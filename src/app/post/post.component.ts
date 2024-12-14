import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  @Input() userName: string = '';
  @Input() displayName: string = '';
  @Input() content: string = ''
}
