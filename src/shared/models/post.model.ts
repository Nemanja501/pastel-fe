import { User } from "./user.model";

export interface Post {
    _id: string;
    content: string;
    user: User;
}