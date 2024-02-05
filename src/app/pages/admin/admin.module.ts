import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminComponentsModule } from '@app/components/admin/admin.module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    AdminComponentsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
