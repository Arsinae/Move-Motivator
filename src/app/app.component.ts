import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/services/auth/auth.service';
import { LangList } from '@app/utils/lang-list';
import { UserService } from '@app/services/server-data/user/user.service';
import { ActivityFunctionService } from './services/functions/activity-function.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private snackbar: MatSnackBar,
    public authService: AuthService,
    private userService: UserService,
    private functionService: ActivityFunctionService,
    private langListService: LangList
  ) { }

  ngOnInit() {
    this.setDefaultLang();
    this.authService.isConnected().subscribe(authState => {
      if (authState) {
        this.getConnectedUser(authState.uid);
      }
    });
  }

  getConnectedUser(userUid: string) {
    this.userService.getUserData(userUid).then(user => {
      if (user) {
        this.authService.setUser(user);
        this.userService.setLastLogin(userUid);
        this.functionService.callComputeDailyAverage();
      } else {
        this.snackbar.open(this.translate.instant(`LOGIN.ERROR`), '', {panelClass: 'danger-snackbar', duration: 4000});
      }
    })
  }

  setDefaultLang() {
    const browserLang = this.translate.getBrowserLang();
    let codeLang = this.langListService.getLangCode(browserLang);
    this.translate.setDefaultLang(codeLang);
    this.translate.use(codeLang);
  }
}
