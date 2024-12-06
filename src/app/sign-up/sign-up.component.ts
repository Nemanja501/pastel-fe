import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { Router } from '@angular/router';
import { ErrorComponent } from '../../shared/components/error/error.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent, ErrorComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signupForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    displayName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', 
      [Validators.required, 
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{6,}')]), // regex that checks if password has 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
    confirmPassword: new FormControl('', Validators.required),
  })

  isLoading = false;
  signupErr: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  get userName(){
    return this.signupForm.get('userName');
  }

  get displayName(){
    return this.signupForm.get('displayName');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }

  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }

  onSubmit(){
    this.isLoading = true;
    this.authService.signup(this.signupForm.value).subscribe({
      next: response => {
        console.log('res', response);
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: err =>{
        console.log('err', err);
        this.signupErr = err.error;
        this.signupErr.data = err.error.data.map((item: any) => item.msg);
        this.isLoading = false;
      }
    });   
  }
}
