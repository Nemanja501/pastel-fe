import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthService { 
    private _isLoggedIn: boolean = false;
    constructor (private http: HttpClient) {}

    signup(signupData: any) {
        return this.http.post('http://localhost:3000/signup', signupData);
    }

    login(loginData: any) {
        return this.http.post('http://localhost:3000/login', loginData);
    }

    get isLoggedIn() {
        const token = localStorage.getItem('token');
        if(token) {
            return true;
        }else {
            return false;
        }
    }

    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }

}