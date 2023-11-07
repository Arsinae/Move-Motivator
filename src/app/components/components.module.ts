import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './core/header-bar/header-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DynamicLocaleId } from '@app/utils/dynamic-locale';
import { SideBarComponent } from './core/side-bar/side-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalsModule } from '../modals/modals.module';
import { BasicStatsComponent } from './stats/basic-stats/basic-stats.component';
import { MonthStatComponent } from './stats/month-stat/month-stat.component';
import { ChartModule } from 'angular-highcharts';
import { GoalBarComponent } from './goals/goal-bar/goal-bar.component';

@NgModule({
  declarations: [
    HeaderBarComponent,
    SideBarComponent,
    BasicStatsComponent,
    MonthStatComponent,
    GoalBarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    ChartModule,
    ModalsModule
  ],
  providers: [
    { provide: LOCALE_ID, useClass: DynamicLocaleId, deps: [TranslateService] },
  ],
  exports: [
    HeaderBarComponent,
    SideBarComponent,
    BasicStatsComponent,
    MonthStatComponent,
    GoalBarComponent
  ]
})
export class ComponentsModule { }
