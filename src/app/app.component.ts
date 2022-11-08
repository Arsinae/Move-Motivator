import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangList } from './utils/lang-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private langListService: LangList
  ) { }

  ngOnInit() {
    this.setDefaultLang();
  }

  setDefaultLang() {
    const browserLang = this.translate.getBrowserLang();
    let codeLang = this.langListService.getLangCode(browserLang);
    this.translate.setDefaultLang(codeLang);
    this.translate.use(codeLang);
  }
}
