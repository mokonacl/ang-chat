import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app'; // 追加
import { User } from 'src/app/class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  create(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const { user } = credential;
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${user.email}`
        };

        user.sendEmailVerification(actionCodeSettings);

        this.db.object(`/users/${user.uid}`).set( new User(user) );
      });
  }

  update(values: { displayName?: string , photoURL?: string }) : Promise<void> {
    return this.afAuth.currentUser.then( ( user : firebase.User | null ) => { //ログインできていないときはnull
      if( user ){
        user.updateProfile(values) //valuesには、displayName
          .then( () => this.db.object(`/users/${user.uid}`).update(values)) //firebase authにuidを更新している
          .catch(error => console.error(error))
      }
    });
  }
}
