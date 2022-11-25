import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // Get user credentials from localStorage
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    // Get Token Expires Date over or not
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(user.token);
    const decode = helper.decodeToken(user.token)

    if (!isExpired) {
      if (next.data?.['role'] === decode.userType) {
        return true;
      }
      this.router.navigate(['/auth']);
      return false;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // @ts-ignore
    const local = JSON.parse(localStorage.getItem('user'));
    if (next.data?.['role'] === local.userType) {
      return false
    } else {
      return true
    }

  }
}


// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuardUser implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     // @ts-ignore
//     // @ts-ignore
//     const local = JSON.parse(localStorage.getItem('user'));
//     if (next.data?.['role'] === local.userType) {
//       return false
//     } else {
//       return true
//     }
//   }
// }


// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuardBeautician implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     // @ts-ignore
//     const local = JSON.parse(localStorage.getItem('user'));
//     if (local.userType === next.data?.['role']) {
//       return true;
//     }
//     return false;
//   }
// }


// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuardTherapists implements CanActivate {
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree>
//     | boolean
//     | UrlTree {
//     // @ts-ignore
//     const local = JSON.parse(localStorage.getItem('user'));
//     if (local.userType === next.data?.['role']) {
//       return true;
//     }
//     return false;
//   }
// }
