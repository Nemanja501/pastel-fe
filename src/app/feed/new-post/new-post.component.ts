import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss'
})
export class NewPostComponent {
  newPostForm = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.maxLength(200)])
  })

  constructor(private postService: PostService) {}

  get content() {
    return this.newPostForm.get('content');
  }

  onSubmit(){
    this.postService.addPost({
      content: this.content?.value,
      userId: JSON.parse(localStorage.getItem('userId') as string)
    }).subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    })
  }
}