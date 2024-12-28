import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../shared/services/post.service';
import { Post } from '../../shared/models/post.model';
import { CommonModule } from '@angular/common';
import { PostComponent } from "../post/post.component";
import { UserCardComponent } from "../user-card/user-card.component";
import { User } from '../../shared/models/user.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SidebarComponent, ReactiveFormsModule, CommonModule, PostComponent, UserCardComponent, LoadingSpinnerComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchForm = new FormGroup({
    search: new FormControl('', Validators.required)
  });
  posts!: Array<Post>;
  users!: Array<User>;
  isLoading: boolean = false;

  constructor(private postService: PostService) {}

  onSubmit() {
    this.isLoading = true;
    this.postService.postSearch(this.searchForm.value as unknown as string).subscribe({
      next: (result: any) =>{
        console.log('search result', result);
        this.posts = result.posts;
        this.users = result.users;
        this.isLoading = false;
      },
      error: err => {
        console.log('search error', err);
      }
    })
  }

}
