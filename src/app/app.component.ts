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
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
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
