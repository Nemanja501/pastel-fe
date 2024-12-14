import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { PostService } from '../../shared/services/post.service';
import { PostComponent } from "../post/post.component";
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [SidebarComponent, NewPostComponent, PostComponent, CommonModule, LoadingSpinnerComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  posts: Array<any> = [];
  newPosts: Array<any> = [];
  page: number = 1;
  initialLoad: boolean = true;
  isLoading: boolean = false;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getFeed().subscribe((result: any) => {
      this.posts = result.posts
      this.initialLoad = false;
    })
  }

  @HostListener("window:scroll", [])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) { // the user has scrolled to the bottom of the page
      this.page++;
      this.postService.getFeed(this.page).subscribe((result: any) =>{
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
