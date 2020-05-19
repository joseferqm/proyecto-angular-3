import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class LoginRouteGuard implements CanActivate {
  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (!user) {
          resolve(true);
        } else {
          resolve(false);
          this.router.navigate([`${this.router.url}`]);
        }
      });
    });
  }
}
