import { Injectable } from '@angular/core';
import * as Auth from '@angular/fire/auth';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null = null;

  constructor(
    private auth: Auth.Auth
  ) { }

  createAccount(mail: string, password: string) {
    return Auth.createUserWithEmailAndPassword(this.auth, mail, password)
  }

  authentify(mail: string, password: string) {
    return Auth.signInWithEmailAndPassword(this.auth, mail, password);
  }

  disconnect() {
    this.user = null;
    return this.auth.signOut();
  }

  isConnected() {
    return Auth.authState(this.auth);
  }

  setUser(user: User) {
    this.user = user;
  }

  getCurrentUser() {
    return this.getCurrentUser;
  }

  sendPasswordResetEmail(email: string) {
    return Auth.sendPasswordResetEmail(this.auth, email);
  }

  verifyPasswordCode(code: string) {
    return Auth.verifyPasswordResetCode(this.auth, code);
  }

  changePassword(code: string, password: string) {
    return Auth.confirmPasswordReset(this.auth, code, password);
  }
}
