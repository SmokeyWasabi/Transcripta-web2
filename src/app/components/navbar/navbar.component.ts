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
import { LayoutService } from '../../service/layout.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import ZH from '../../../../assets/i18n/zh.json';
import EN from '../../../../assets/i18n/en.json';
import { LanguageService } from '../../service/language.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

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
    MenubarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  layoutService: LayoutService = inject(LayoutService);

  languages: any | undefined;
  menuItems: MenuItem[] = [];

  selectedLanguage!: string; // Default language
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

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

    this.populateMenuItems();
  }

  onLanguageChange(lang: any): void {
    this.selectedLanguage = lang.value;
    this.translate.use(this.selectedLanguage).subscribe(() => {
      this.populateMenuItems(); // Refresh labels
    });

    this.languageService.setLanguage(this.selectedLanguage);
  }

  populateMenuItems(): void {
    this.translate
      .get(['HOME', 'FEATURE', 'ADVANTAGES', 'PRICING_NAV'])
      .subscribe((translations) => {
        this.menuItems = [
          {
            label: translations['HOME'],
            icon: 'pi pi-home',
            routerLink: ['/home'],
            fragment: 'section-main',
          },
          {
            label: translations['FEATURE'],
            icon: 'pi pi-wrench',
            routerLink: ['/home'],
            fragment: 'section-feature',
          },
          {
            label: translations['ADVANTAGES'],
            icon: 'pi pi-user',
            routerLink: ['/home'],
            fragment: 'section-why',
          },
          {
            label: translations['PRICING_NAV'],
            icon: 'pi pi-dollar',
            routerLink: ['/home'],
            fragment: 'section-pricing',
          },
        ];
      });
  }
  isDarkMode = computed(() => this.layoutService.appState().darkMode);

  toggleDarkMode() {
    this.layoutService.appState.update((state) => ({
      ...state,
      darkMode: !state.darkMode,
    }));
  }
}
