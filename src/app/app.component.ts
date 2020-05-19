import {Component, OnInit} from '@angular/core';
import {UserService} from './shared/user.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'esqueleto-angular';
  // private showSideNav = false;

  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    // Se revisa en Firebase si el usuario cambio su estado de autenticación
    // (i.e., pasó de logged out a logged in o a la inversa)
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userService.performLogin(user.uid);
      } else {
        this.userService.performLogout();
      }
    });

    // this.sideNavService.statusChange.subscribe((showSideNav) => {
    //   this.showSideNav = showSideNav;
    // });
  }

  // getShowSideNav() {
  //   return this.showSideNav;
  // }
}
