import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Custom TranslateLoader to load translation files from assets folder
export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return {
    getTranslation: (lang: string): Observable<any> =>
      http.get(`/assets/i18n/${lang}.json`),
  };
}
