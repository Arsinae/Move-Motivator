import { Injectable } from '@angular/core';
import { Lang } from '@app/models/lang';

@Injectable({
  providedIn: 'root'
})
export class LangList {

  private LANG_LIST : Lang[] =  [{lang:'fr', code: 'fr-FR'}, {lang: 'en', code: 'fr-FR'}]
  
  public getLangList(): Lang[] {
    return this.LANG_LIST;
  }

  public getLangCode(lang: string | undefined): string {
    const currentLang = this.LANG_LIST.find(l => l.lang === lang);
    return (lang !== undefined && currentLang !== undefined) ? currentLang.code : this.LANG_LIST[0].code;
  }
}