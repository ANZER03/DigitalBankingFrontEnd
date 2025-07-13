import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

export const appHhtpInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  if(!req.url.includes('/login')){
    const newReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authService.accessToken),
    });
    return next(newReq).pipe(
      catchError(err => {
        if(err.status==401){
        authService.logout();
        }
        return throwError(err.message);
      })
    );
  }else {
    return next(req);
  }



};
