import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KilometerPipe } from '@app/pipes/kilometer.pipe';
import { DistanceService } from '@app/services/server-data/distances/distance.service';
import { UserInfosService } from '@app/services/server-data/user/userinfos.service';
import { getDaysInMonth } from 'date-fns';

@Component({
  selector: 'app-goal-bar',
  templateUrl: './goal-bar.component.html',
  styleUrls: ['./goal-bar.component.scss']
})
export class GoalBarComponent implements OnInit {

  public startDate: Date = new Date();
  public remainingDays: number = 30;
  public monthlyGoal: number = 150000;
  public currentDistance: number = 0;

  constructor(
    private distanceService: DistanceService,
    private userInfoService: UserInfosService,
    private kilometerPipe: KilometerPipe
  ) { }

  ngOnInit(): void {
    this.startDate.setDate(1);
    this.startDate.setHours(0, 0, 0, 0);
    this.remainingDays = Math.max(getDaysInMonth(this.startDate) - new Date().getDate(), 1);
    this.getGoalInfo();
    this.getDistance();
  }

  async getGoalInfo() {
    const goal = await this.userInfoService.getUserGoalInfo();
    if (goal?.goal) {
      this.monthlyGoal = goal.goal;
    }
  }

  async getDistance() {
    this.distanceService.getDistancesBetweenDates(this.startDate, new Date).subscribe(distances => {
      this.currentDistance = distances.reduce((a, b) => a + b.distance, 0);
    })
  }

  public get progressPercent(): number {
    return Math.min(this.currentDistance / this.monthlyGoal * 100, 100);
  }

  public getDistanceTooltip(): string {
    if (this.monthlyGoal > this.currentDistance) {
      const dailyDistance = (this.monthlyGoal - this.currentDistance) / this.remainingDays
      return `${this.remainingDays} jours restants (${this.kilometerPipe.transform(dailyDistance)}km par jour)`;
    } else {
      return 'Objectif atteint';
    }
  }
}
