import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { PostService } from '../../shared/services/post.service';
import { PostComponent } from "../post/post.component";
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [SidebarComponent, NewPostComponent, PostComponent, CommonModule, LoadingSpinnerComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  posts: Array<Post> = [];
  newPosts: Array<Post> = [];
  page: number = 1;
  initialLoad: boolean = true;
  isLoading: boolean = false;
  userId: string = '';
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userId') as string);
    this.postService.getFeed(this.userId).subscribe((result: any) => {
      console.log('feed', result);
      this.posts = result.posts as Array<Post>;
      console.log('feed posts', this.posts);
      this.initialLoad = false;
    })
  }

  @HostListener("document:scroll", [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) { // the user has scrolled to the bottom of the page
      this.page++;
      this.postService.getFeed(this.userId, this.page).subscribe((result: any) =>{
        this.isLoading = true;
        console.log('result', result);
        if(result.posts.length > 0){
          if(this.newPosts.length <= 0){
            this.newPosts = result.posts
          }else{
            this.posts.push(...this.newPosts);
            this.newPosts = result.posts
          }
        }else {
          this.page--;
        }
        console.log(this.page);
        this.isLoading = false;
      })
    }
  }

}
