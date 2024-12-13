import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService { 
    isLoggedIn: boolean = false;
    constructor (private http: HttpClient) {}

    signup(signupData: any) {
        return this.http.post('http://localhost:3000/signup', signupData);
    }

    login(loginData: any) {
        return this.http.post('http://localhost:3000/login', loginData);
    }

}