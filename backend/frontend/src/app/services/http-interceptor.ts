import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = sessionStorage.getItem('token');

        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(req).pipe(catchError(error => this.handleError(error)));
    }

    handleError(error: HttpErrorResponse) {

        if (error.error instanceof ErrorEvent) {
            console.log('Client side error message', 'Client side error');
        } else {
            console.log('Server side error message :', error.error.message);
        }

        return throwError(error.error);
    }
}