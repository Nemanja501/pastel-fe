import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function AuthInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if(token) {
        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + JSON.parse(token || ''))
        });
    }
    return next(req);
}