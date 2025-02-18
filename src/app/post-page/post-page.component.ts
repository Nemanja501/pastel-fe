import { Component, HostListener, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Post } from '../../shared/models/post.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../shared/services/post.service';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommonModule } from '@angular/common';
import { CommentComponent } from "./comment/comment.component";
import { Comment } from '../../shared/models/comment.model';
import { calculateDiffBetweenDates } from '../../shared/util/date.util';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [SidebarComponent, RouterLink, AddCommentComponent, CommonModule, CommentComponent],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent implements OnInit{
  postId: string = '';
  post!: Post;
  comments!: Array<Comment>;
  newComments!: Array<Comment>;
  userLink: string = '';
  date!: string; 
  page: number = 1;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') as string;
    this.postService.getSinglePost(this.postId).subscribe({
      next: (result: any) => {
        console.log('single post res', result);
        this.post = result.post;
        const _date = new Date(this.post.createdAt);
        this.date = calculateDiffBetweenDates(_date);
        this.comments = result.post.comments;
        console.log('comments', this.comments);
        this.userLink = `/user/${this.post.user._id}`
      },
      error: err => console.log('single post err', err)
    })
  }

    @HostListener("document:scroll", [])
    onScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) { // the user has scrolled to the bottom of the page
        this.page++;
        this.postService.getSinglePost(this.postId, this.page).subscribe((result: any) =>{
          console.log('result', result);
          if(result.post.comments.length > 0){
            if(!this.newComments || this.newComments.length <= 0){
              this.newComments = result.post.comments
            }else{
              this.comments.push(...this.newComments);
              this.newComments = result.post.comments
            }
          }else {
            this.page--;
          }
          console.log(this.page);
        })
      }
    }
}
