import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'esqueleto-angular';

  constructor(private userService: UserService) {}

  // Para inicializar Firebase una única vez
  // Funciona como un singleton para toda la aplicación
  ngOnInit(): void {
    // Configuracion de Firebase (se toma de la consola Web => Project Settings)
    const firebaseConfig = {
      apiKey: 'AIzaSyBuI9n-Od-K6sQZZCq9ekRLyljdsp8YIJ0',
      authDomain: 'proyecto-2-angular-ci2400.firebaseapp.com',
      databaseURL: 'https://proyecto-2-angular-ci2400.firebaseio.com',
      projectId: 'proyecto-2-angular-ci2400',
      storageBucket: 'proyecto-2-angular-ci2400.appspot.com',
      messagingSenderId: '411773194587',
      appId: '1:411773194587:web:395644b1fa8bfee1fa4a7e',
      measurementId: 'G-9KXNRWEET2'
    };

    // Inicialización del cliente de Firebase
    firebase.initializeApp(firebaseConfig);

    // Se revisa en Firebase si el usuario cambio su estado de autenticación
    // (i.e., pasó de logged out a logged in o a la inversa)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userService.performLogin(user.uid);
      } else {
        this.userService.performLogout();
      }
    });
  }
}
