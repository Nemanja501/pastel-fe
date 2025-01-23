import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PostComponent } from "../post/post.component";
import { User } from '../../shared/models/user.model';
import { Post } from '../../shared/models/post.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { reloadCurrentRoute } from '../../shared/util/reload.util';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [SidebarComponent, PostComponent, CommonModule, RouterLink],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit, OnDestroy{
  id: any = '';
  page: number = 1;
  user!: User;
  isFollowing: boolean = false;
  isCurrentUser: boolean = false;
  posts: Array<Post> = [];
  newPosts: Array<Post> = [];
  editUserLink: string = '';
  subscription!: Subscription;

  constructor (private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.route.params.subscribe(value => { //reload page if the user navigates to another user page
      if(value['id'] && value['id'] !== this.id) {
        reloadCurrentRoute(this.router);
      }
    });
    const followerId = JSON.parse(localStorage.getItem('userId') as string);
    this.userService.getUser(followerId, this.id).subscribe((resUser: any) => {
      this.user = resUser.user as User;
      this.isFollowing = resUser.isFollowing;
      this.isCurrentUser = resUser.isCurrentUser;
      this.posts = resUser.user.posts;
      this.editUserLink = `/user/edit/${this.id}`
    })
  }

  followUser() {
    console.log('follow user');
    const followerId = JSON.parse(localStorage.getItem('userId') as string);
    if(!followerId) {
      this.router.navigate(['/login'])
    }
    this.userService.followUser(followerId, this.user._id).subscribe({
      next: response => reloadCurrentRoute(this.router),
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
      next: response => reloadCurrentRoute(this.router),
      error: err => console.log('unfollowing error', err)
    });
  }

    @HostListener("document:scroll", [])
    onScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) { // the user has scrolled to the bottom of the page
        this.page++;
        const followerId = JSON.parse(localStorage.getItem('userId') as string);
        this.userService.getUser(followerId, this.id, this.page).subscribe((result: any) =>{
          console.log('result', result);
          if(result.user.posts.length > 0){
            if(this.newPosts.length <= 0){
              this.newPosts = result.user.posts
            }else{
              this.posts.push(...this.newPosts);
              this.newPosts = result.user.posts
            }
          }else {
            this.page--;
          }
          console.log(this.page);
        })
      }
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}
