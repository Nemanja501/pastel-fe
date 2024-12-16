import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {}

    getUser(followerId: string, userId: string){
        return this.http.get(`http://localhost:3000/users/${userId}`, {
            params: {
                followerId,
                userId
            }
        });
    }

    followUser(followerId: string, userId: string) {
        return this.http.post('http://localhost:3000/follow', {
            followerId,
            userId
        });
    }
}