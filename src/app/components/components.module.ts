import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DynamicLocaleId } from '@app/utils/dynamic-locale';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderBarComponent,
    SideBarComponent
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
  ],
  providers: [
    { provide: LOCALE_ID, useClass: DynamicLocaleId, deps: [TranslateService] },
  ],
  exports: [
    HeaderBarComponent,
    SideBarComponent
  ]
})
export class ComponentsModule { }
