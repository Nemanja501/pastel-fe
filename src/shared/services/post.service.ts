import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class PostService {
    constructor (private http: HttpClient) {}

    addPost(postData: any) {
        return this.http.post('http://localhost:3000/post', postData);
    }
}