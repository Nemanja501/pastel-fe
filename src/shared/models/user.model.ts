import { Post } from "./post.model";

export interface User {
    _id: string;
    userName: string;
    displayName: string;
    email: string;
    password: string;
    post: Array<Post>;
    followers: Array<User>;
    following: Array<User>;
}