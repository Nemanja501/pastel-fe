import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NewPostComponent } from "./new-post/new-post.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [SidebarComponent, NewPostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {

}
