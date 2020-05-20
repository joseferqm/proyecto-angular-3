import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (localStorage.userLoggedIn) {
      const temp = localStorage.getItem('userLoggedIn') === 'true';
      console.log(localStorage.getItem('userLoggedIn'));
      console.log('booleano en sidenav component', temp);
      this.isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    }

    this.userService.statusChange.subscribe((userData) => {
      if (userData) {
        // Si es distinto de null, el usuario está logueado
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
