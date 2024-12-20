import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PostComponent } from "../post/post.component";
import { User } from '../../shared/models/user.model';
import { Post } from '../../shared/models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [SidebarComponent, PostComponent, CommonModule, RouterLink],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{
  id: any = '';
  user!: User;
  isFollowing: boolean = false;
  isCurrentUser: boolean = false;
  posts: Array<Post> = [];
  editUserLink: string = '';

  constructor (private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const followerId = JSON.parse(localStorage.getItem('userId') as string);
    this.userService.getUser(followerId, this.id).subscribe((resUser: any) => {
      this.user = resUser.user as User;
      this.isFollowing = resUser.isFollowing;
      this.isCurrentUser = resUser.isCurrentUser;
      this.posts = resUser.user.posts;
      this.editUserLink = `/user/edit/${this.id}`
    })
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  followUser() {
    console.log('follow user');
    const followerId = JSON.parse(localStorage.getItem('userId') as string);
    if(!followerId) {
      this.router.navigate(['/login'])
    }
    this.userService.followUser(followerId, this.user._id).subscribe({
      next: response => this.reloadCurrentRoute(),
      error: err => console.log('following error', err)
    });
  }

  unfollowUser() {
    console.log('unfollow user');
    const followerId = JSON.parse(localStorage.getItem('userId') as string);
    if(!followerId) {
      this.router.navigate(['/login'])
    }
    this.userService.unfollowUser(followerId, this.user._id).subscribe({
      next: response => this.reloadCurrentRoute(),
      error: err => console.log('unfollowing error', err)
    });
  }
}
