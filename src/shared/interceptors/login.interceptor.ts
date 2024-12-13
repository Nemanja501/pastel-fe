import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

export function LoginInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('err', error);
      if(error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        authService.isLoggedIn = false;
        router.navigate(['/login']);
      } 
      return throwError(() => error);
    })
  );
  }