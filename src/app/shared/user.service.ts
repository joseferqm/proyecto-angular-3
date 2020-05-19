import {Injectable, EventEmitter} from '@angular/core';
import * as firebase from 'firebase';
import { UserData } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = false;
  public statusChange: any = new EventEmitter<any>();

  constructor() {}

  performLogin(uid: string) {
    this.getUserDataFromFirebase(uid).then((result) => {
      this.isLoggedIn = true;
      const userData: UserData = result.val();
      this.statusChange.emit(userData);
    });
  }

  isUserLoggedIn() {
    return this.isLoggedIn;
  }

  performLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.isLoggedIn = false;
        this.statusChange.emit(null);
      });
  }

  getUserDataFromFirebase(uid: string) {
    return firebase.database().ref('users').child(uid).once('value');
  }
}
