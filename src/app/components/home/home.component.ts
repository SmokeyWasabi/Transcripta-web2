import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ActivatedRoute, Router } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { LanguageService } from '../../service/language.service';
import { PanelModule } from 'primeng/panel';

import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

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
    PanelModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  protected voiceToTextGifSrc: string =
    'assets/resource/Enterprise-Grade_Voice-to-Text_EN.gif';

  protected qaItems = [
    { questionKey: 'QA.QUESTION1', answerKey: 'QA.ANSWER1' },
    { questionKey: 'QA.QUESTION2', answerKey: 'QA.ANSWER2' },
    { questionKey: 'QA.QUESTION3', answerKey: 'QA.ANSWER3' },
    { questionKey: 'QA.QUESTION4', answerKey: 'QA.ANSWER4' },
    { questionKey: 'QA.QUESTION5', answerKey: 'QA.ANSWER5' },
    { questionKey: 'QA.QUESTION6', answerKey: 'QA.ANSWER6' },
    { questionKey: 'QA.QUESTION7', answerKey: 'QA.ANSWER7' },
  ];

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
