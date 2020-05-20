import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Subscription, Observable, of} from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  private isLoggedIn = false;
  private subscription: Subscription;
  userDataObs: Observable<any>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.statusChange.subscribe((userData) => {
      if (userData) {
        // Si es distinto de null, el usuario está logueado
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      this.userDataObs = of({isLoggedIn: this.isLoggedIn}).pipe();
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
