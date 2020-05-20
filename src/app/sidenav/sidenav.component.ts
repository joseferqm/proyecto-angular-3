import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Subscription, Observable, of} from 'rxjs';
import {share} from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private isLoggedIn = false;
  userDataObs: Observable<any>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.statusChange.subscribe((userData) => {
      if (userData) {
        // Si es distinto de null, el usuario está logueado
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      this.userDataObs = of({isLoggedIn: this.isLoggedIn}).pipe();
    });
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
