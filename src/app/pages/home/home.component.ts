import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserDistanceStats } from '@app/models/stats';
import { AuthService } from '@app/services/auth/auth.service';
import { StatsService } from '@app/services/server-data/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  public userStats: UserDistanceStats | undefined = undefined;

  constructor(
    private authService: AuthService,
    private statService: StatsService
  ) { }

  ngAfterViewInit(): void {
    this.authService.getCurrentUserObservable().subscribe(res => {
      this.getUserStats();
    });
  }
  
  async getUserStats() {
    this.userStats = await this.statService.getUserDistanceStat();
  }

}
