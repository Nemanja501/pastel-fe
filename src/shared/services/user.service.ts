import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) {}

    getUser(followerId: string, userId: string, page: number = 1){
        return this.http.get(`http://localhost:3000/users/${userId}`, {
            params: {
                followerId,
                userId,
                page
            }
        });
    }

    followUser(followerId: string, userId: string) {
        return this.http.post('http://localhost:3000/follow', {
            followerId,
            userId
        });
    }

    unfollowUser(followerId: string, userId: string) {
        return this.http.post('http://localhost:3000/unfollow', {
            followerId,
            userId
        });
    }

    getEditUserData(userId: string) {
        return this.http.get('http://localhost:3000/users/edit', {
            params: {
                userId
            }
        });
    }

    putEditUser(userData: any, userId: string) {
        return this.http.put('http://localhost:3000/users/edit', userData, {
            params: {
                userId
            }
        });
    }
}