import { inject, Injectable } from '@angular/core';
import { Auth, authState, confirmPasswordReset, createUserWithEmailAndPassword, GoogleAuthProvider, Persistence, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, verifyPasswordResetCode } from '@angular/fire/auth';
import { User } from '@app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null = null;
  private authErrors: any = {
    "auth/user-not-found": "EMAIL_NOT_FOUND",
    "auth/wrong-password": 'INVALID_PASSWORD',
    "user-disabled": "USER_DISABLED",
    "auth/email-already-in-use": "EMAIL_ALREADY_USE",
    "auth/invalid-email": "INVALID_EMAIL",
    "auth/weak-password": "WEAK_PASSWORD",
    "auth/expired-action-code": "EXPIRED_CODE",
    "auth/invalid-action-code": "INVALID_CODE"
  }

  constructor(
    private auth: Auth
  ) {
    this.auth = inject(Auth);
  }

  createAccount(mail: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, mail, password)
  }

  authentify(mail: string, password: string) {
    return signInWithEmailAndPassword(this.auth, mail, password);
  }

  authentifyWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    console.log(this.auth, provider);
    return signInWithPopup(this.auth, provider);
  }

  disconnect() {
    this.user = null;
    return this.auth.signOut();
  }

  setConnectionPersistence(persistence: Persistence) {
    return this.auth.setPersistence(persistence);
  }

  isConnected() {
    return authState(this.auth as any);
  }

  setUser(user: User) {
    this.user = user;
  }

  getCurrentUser() {
    return this.user;
  }

  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  verifyPasswordCode(code: string) {
    return verifyPasswordResetCode(this.auth, code);
  }

  changePassword(code: string, password: string) {
    return confirmPasswordReset(this.auth, code, password);
  }

  getAuthError(errorCode: string): string {
    return (errorCode && this.authErrors[errorCode] !== undefined) ? this.authErrors[errorCode] : 'ERROR'
  }
}
