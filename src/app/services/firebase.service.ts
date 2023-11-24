import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { user } from '../models/user.model';
import { Usuario } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

 auth = inject(AngularFireAuth);

 signIn(user: user) {
  return signInWithEmailAndPassword(getAuth(), user.email, user.password)

 }
}
