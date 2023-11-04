import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserDistanceStats } from '@app/models/stats';
import { User } from '@app/models/user';
import { AuthService } from '@app/services/auth/auth.service';
import { DistanceService } from '@app/services/server-data/distance.service';
import { StatsService } from '@app/services/server-data/stats.service';
import { Duration, intervalToDuration } from 'date-fns';

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
