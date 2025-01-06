import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class PostService {
    constructor (private http: HttpClient) {}

    addPost(postData: any) {
        return this.http.post('http://localhost:3000/post', postData);
    }

    getFeed(userId: string, page: number = 1) {
        return this.http.get('http://localhost:3000/feed', {
            params: { page, userId }
        });
    }

    getExplore(page: number = 1) {
        return this.http.get('http://localhost:3000/explore', {
            params: { page }
        });
    }

    postSearch(search: string, page: number = 1) {
        return this.http.post('http://localhost:3000/search', search, {
            params: { page }
        })
    }

    getSinglePost(id: string, page: number = 1) {
        return this.http.get(`http://localhost:3000/post/${id}`, {
            params: { page }
        });
    }

    postComment(commentData: any) {
        return this.http.post('http://localhost:3000/comment', commentData);
    }
}