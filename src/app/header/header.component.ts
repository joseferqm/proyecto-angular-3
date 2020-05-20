import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Subscription, Observable, of} from 'rxjs';
import {share} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter<any>();
  private isLoggedIn;
  private subscription: Subscription;
  userDataObs: Observable<any>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.statusChange.subscribe((userData) => {
      let userDataCopy;
      if (userData) {
        // Si es distinto de null, el usuario está logueado
        this.isLoggedIn = true;
        userDataCopy = {...userData};
      } else {
        this.isLoggedIn = false;
        userDataCopy = {};
      }
      userDataCopy.isLoggedIn = this.isLoggedIn;
      this.userDataObs = of(userDataCopy).pipe();
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }

  logout() {
    this.userService.performLogout();
  }

  onClickMenuIconButton() {
    this.sidenavToggle.emit();
  }
}
