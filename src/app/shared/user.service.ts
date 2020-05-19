import {Injectable, EventEmitter} from '@angular/core';
import {UserData} from './models';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isLoggedIn = false;
  public statusChange: any = new EventEmitter<any>();

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firebaseDatabase: AngularFireDatabase
  ) {}

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
    this.firebaseAuth.signOut().then(() => {
      this.isLoggedIn = false;
      this.statusChange.emit(null);
    });
  }

  getUserDataFromFirebase(uid: string) {
    return this.firebaseDatabase.database.ref('users').child(uid).once('value');
  }
}
