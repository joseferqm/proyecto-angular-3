import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import * as firebase from 'firebase';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Sin Firebase
    /*
    if (this.userService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    */

    // Con Firebase
    return new Promise((resolve, reject) => {
      // Se revisa en Firebase si el usuario cambio su estado de autenticación
      // (i.e., pasó de logged out a logged in o a la inversa)
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
