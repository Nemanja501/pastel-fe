import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PostComponent } from "../post/post.component";
import { User } from '../../shared/models/user.model';
import { Post } from '../../shared/models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [SidebarComponent, PostComponent, CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{
  id: any = '';
  user!: User;
  posts: Array<Post> = [];

  constructor (private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe((resUser: any) => {
      console.log(resUser);
      this.user = resUser.user as User;
      this.posts = resUser.user.posts;
    })
  }
}
