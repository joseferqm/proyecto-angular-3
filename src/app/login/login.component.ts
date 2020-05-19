import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        console.log('userData', userData);
        this.userService.performLogin(userData.user.uid);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log('error', error);

        // Notificar con un Toast
        this.notificationService.showErrorMessage('Error!', error.message);
      });
  }
}
