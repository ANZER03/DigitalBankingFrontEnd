import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const authSerivce = inject(AuthService);

  if(authSerivce.roles.includes('ADMIN')){
    return true
  }else{
    router.navigate(['/admin/not-authorize']);
    return false
  }
};
