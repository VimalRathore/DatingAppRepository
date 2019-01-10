import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxJs/Operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if ( error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError){
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modelStateErrors = '';
                    if (serverError && typeof serverError === 'object') {
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modelStateErrors += serverError[key] + '\n';
                                }
                        }
                    }
                    return throwError(modelStateErrors || serverError || 'serverError');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
provide : HTTP_INTERCEPTORS,
UseClass: ErrorInterceptor,
multi: true
};
