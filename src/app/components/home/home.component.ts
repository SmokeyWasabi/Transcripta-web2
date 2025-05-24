import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';

// <-- import TranslateModule
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    ImageModule,
    AnimateOnScrollModule,
    AccordionModule,
    TranslateModule, // <-- add this so the translate pipe is available
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  protected voiceToTextGifSrc: string =
    'assets/resource/Enterprise-Grade_Voice-to-Text_EN.gif';

  constructor(
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  protected translatedEmail = '';

  ngOnInit(): void {
    this.languageService.getLanguage().subscribe((lang) => {
      this.voiceToTextGifSrc =
        lang === 'zh'
          ? 'assets/resource/Enterprise-Grade_Voice-to-Text_CN.gif'
          : 'assets/resource/Enterprise-Grade_Voice-to-Text_EN.gif';
    });

    this.loadEmail(); // initial load
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadEmail(); // reload on language change
    });

    // Listen for fragment changes and scroll to the corresponding section
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const section = document.getElementById(fragment);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  changeGif(): void {
    this.voiceToTextGifSrc = 'assets/resource/alternate.gif'; // dynamically change this path
  }

  loadEmail() {
    this.translate.get('CONTACT.EMAIL').subscribe((email: string) => {
      this.translatedEmail = email;
    });
  }
}
