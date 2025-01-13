import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PostService } from "../../../shared/services/post.service";
import { Router } from "@angular/router";
import { reloadCurrentRoute } from "../../../shared/util/reload.util";

@Component({
    selector: 'app-add-comment',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './add-comment.component.html',
    styleUrl: './add-comment.component.scss'
})
export class AddCommentComponent {
    @Input() postId!: string;
    addCommentForm = new FormGroup({
        content: new FormControl('', [Validators.required, Validators.maxLength(200)])
    })

    constructor(private postService: PostService, private router: Router) {}

    get content() {
        return this.addCommentForm.get('content');
    }

    onSubmit() {
        const userId = JSON.parse(localStorage.getItem('userId') as string);
        this.postService.postComment({
            postId: this.postId,
            userId,
            content: this.content?.value
        }).subscribe({
            next: (result: any) =>{
                console.log('post comment result', result)
                reloadCurrentRoute(this.router);
            },
            error: err => console.log('post comment err', err)
        })
    }
}