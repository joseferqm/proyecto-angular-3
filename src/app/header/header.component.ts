import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';
import {Subscription, Observable, of} from 'rxjs';
import {share} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter<any>();
  private loading = false;
  private isLoggedIn;

  private subscription: Subscription;
  private userData: UserData;
  userDataObs: Observable<UserData>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (localStorage.userLoggedIn) {
      const temp = localStorage.getItem('userLoggedIn') === 'true';
      console.log(localStorage.getItem('userLoggedIn'));
      console.log('booleano en header component', temp);
      this.isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    }

    this.subscription = this.userService.statusChange.subscribe((userData) => {
      if (userData) {
        // Si es distinto de null, el usuario está logueado
        this.isLoggedIn = true;
        this.userData = userData;
        this.userDataObs = of(userData).pipe(share());
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }

  logout() {
    this.userService.performLogout();
  }

  getUserData(): UserData {
    return this.userData;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  onClickMenuIconButton() {
    this.sidenavToggle.emit();
  }
}
