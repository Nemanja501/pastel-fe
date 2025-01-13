import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../shared/services/post.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { reloadCurrentRoute } from '../../../shared/util/reload.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  newPostForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });
  isLoading = false;

  constructor(private postService: PostService, private router: Router) {}

  get content() {
    return this.newPostForm.get('content');
  }

  onSubmit(){
    this.isLoading = true;
    this.postService.addPost({
      content: this.content?.value,
      userId: JSON.parse(localStorage.getItem('userId') as string)
    }).subscribe({
      next: response => {
        this.isLoading = false;
        reloadCurrentRoute(this.router);
      },
      error: err => console.log(err)
    })
  }
}