import { Post } from "./post.model";
import { User } from "./user.model";

export interface Comment {
    _id: string;
    content: string;
    user: User;
    post: Post;
}