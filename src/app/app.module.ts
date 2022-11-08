import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicLocaleId } from './utils/dynamic-locale';
import { translateLoader } from './utils/multi-translate-http-loader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
  providers: [
    TranslateService,
    { provide: LOCALE_ID, useClass: DynamicLocaleId, deps: [TranslateService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
