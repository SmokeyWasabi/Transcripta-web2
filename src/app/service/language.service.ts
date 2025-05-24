import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  setLanguage(lang: string): void {
    this.languageSubject.next(lang);
  }

  getLanguage(): Observable<string> {
    return this.languageSubject.asObservable();
  }
}
