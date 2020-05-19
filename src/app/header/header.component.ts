import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../shared/user.service';
import {UserData} from '../shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter<any>();
  private isLoggedIn = false;
  private userData: UserData;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.statusChange.subscribe((userData) => {
      console.log('userData, en header', userData);
      if (userData) {
        // Si es distinto de null, el usuario está logueado
        this.isLoggedIn = true;
        this.userData = userData;
      } else {
        this.isLoggedIn = false;
      }
    });
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
