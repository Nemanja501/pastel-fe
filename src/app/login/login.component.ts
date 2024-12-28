import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorComponent } from '../../shared/components/error/error.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingSpinnerComponent, ErrorComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  isLoading = false;
  loginErr: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(){
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log('res', response);
        localStorage.setItem('token', JSON.stringify(response.token));
        localStorage.setItem('userId', JSON.stringify(response.userId));
        this.authService.isLoggedIn = true;
        this.isLoading = false;
        this.router.navigate(['/feed']);
      },
      error: err =>{
        console.log('err', err);
        this.loginErr = err.error;
        this.loginErr.data = err.error.data.map((item: any) => item.msg);
        this.isLoading = false;
      }
    });   
  }
}
