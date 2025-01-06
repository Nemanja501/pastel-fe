import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-comment',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
    @Input() userName!: string;
    @Input() displayName!: string;
    @Input() content!: string;
    @Input() userId!: string;
    userLink!: string;

    ngOnInit(): void {
        this.userLink = `/user/${this.userId}`;
    }
}