import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserDistanceStats } from '@app/models/stats';
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

  public userStats: UserDistanceStats | undefined = undefined;
  public signInDuration: Duration = null;
  public todayDistance: number = 0;

  constructor(
    private authService: AuthService,
    private statService: StatsService,
    private distanceService: DistanceService
  ) { }

  ngAfterViewInit(): void {
    this.authService.getCurrentUserObservable().subscribe(res => {
      this.getUserStats();
    });
  }
  
  async getUserStats() {
    this.userStats = await this.statService.getUserDistanceStat();
    this.signInDuration = intervalToDuration({
      start: this.authService.getCurrentUser()?.createdAt || new Date(),
      end: new Date()
    });
    this.distanceService.getTodayDistances().subscribe(res => {
      this.todayDistance = res.map(distance => distance.distance).reduce((a,b) => a + b, 0);
    })
  }

  public get SignInDurationText(): string {
    return (this.signInDuration?.years > 0 ? `${this.signInDuration.years} ${this.signInDuration.years > 1 ? 'ans' : 'an'} ` : '') +
      (this.signInDuration?.months > 0 ? `${this.signInDuration.months} mois ` : '') +
      (this.signInDuration?.days > 0 ? `${this.signInDuration.days} ${this.signInDuration.days > 1 ? 'jours' : 'jour'} ` : '');
  }

}
