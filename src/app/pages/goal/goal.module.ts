import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalComponent } from './goal.component';
import { GoalRoutingModule } from './goal-routing.module';
import { ComponentsModule } from '@app/components/components.module';



@NgModule({
  declarations: [
    GoalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    GoalRoutingModule
  ]
})
export class GoalModule { }
