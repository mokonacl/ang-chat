import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app'; // 追加

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth ) { 
    //this.afAuth.onAuthStateChanged( user => console.log(user));
  }

  login(email: string , password: string): Promise<firebase.auth.UserCredential | void>{
    return this.afAuth.signInWithEmailAndPassword( email , password )
      .catch( error => console.error(error) );

  }

  logout(): Promise<void>{
    return this.afAuth.signOut();
  }
}
