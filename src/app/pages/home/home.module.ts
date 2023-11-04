import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from "@angular/material/menu"
import { MatIconModule } from "@angular/material/icon";

import { HomeComponent } from './home.component';
import { DynamicLocaleId } from '@app/utils/dynamic-locale';
import { ComponentsModule } from '@app/components/components.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    ComponentsModule
  ],
  providers: [
    { provide: LOCALE_ID, useClass: DynamicLocaleId, deps: [TranslateService] },
  ]
})
export class HomeModule { }
