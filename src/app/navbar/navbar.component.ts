import {
  Component,
  computed,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../service/layout.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import ZH from '../../../assets/i18n/zh.json';
import EN from '../../../assets/i18n/en.json';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  layoutService: LayoutService = inject(LayoutService);

  languages: any | undefined;

  selectedLanguage: string | undefined; // Default language
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.languages = [
      { label: 'English', value: 'en' },
      { label: '中文', value: 'zh' },
    ];

    this.selectedLanguage = 'en';

    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
    this.translate.setTranslation('en', EN);
    this.translate.setTranslation('zh', ZH);
  }

  onLanguageChange(lang: any): void {
    this.translate.use(lang.value);
  }
  isDarkMode = computed(() => this.layoutService.appState().darkMode);

  toggleDarkMode() {
    this.layoutService.appState.update((state) => ({
      ...state,
      darkMode: !state.darkMode,
    }));
  }
}
