import { UserCredential } from "@angular/fire/auth";
import { FormGroup } from "@angular/forms";
import { differenceInDays } from "date-fns";

export class User {
  public uuid: string | undefined = '';
  public email: string = '';
  public username: string = '';
  public lastLogin: Date = new Date();
  public createdAt?: Date = new Date();

  static setNewUser(formGroup: FormGroup) {
    const user: User = {
      uuid: undefined, email: formGroup.get('email')?.value, username: formGroup.get('username')?.value, lastLogin: new Date()
    };
    return user;
  }

  static setNewUserFromAuthProvider(credential: UserCredential) {
    const user: User = {
      uuid: undefined,
      email: credential.user.email ? credential.user.email : '',
      username: credential.user.displayName ? credential.user.displayName: '',
      lastLogin: new Date()
    };
    return user;
  }

  static formatUser(uuid: string, data: User) {
    const user: User = {
      uuid: uuid, email: data.email, username: data.username, lastLogin: (<any>data.lastLogin).toDate(), createdAt: (<any>data.createdAt).toDate()
    }
    return user;
  }
}