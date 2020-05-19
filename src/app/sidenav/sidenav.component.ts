import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private isLoggedIn = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.statusChange.subscribe((userData) => {
      console.log('userData en sidenav', userData);
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
