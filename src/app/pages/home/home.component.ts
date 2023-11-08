import { AfterViewInit, Component } from '@angular/core';
import { User } from '@app/models/user';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  public user: User = null;

  constructor(
    private authService: AuthService,
  ) { }

  ngAfterViewInit(): void {
    this.authService.getCurrentUserObservable().subscribe(res => {
      this.user = res;
    });
  }
}
