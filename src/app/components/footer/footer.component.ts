import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  host: {
    class: 'footer',
  },
})
export class FooterComponent implements OnInit {
  protected translatedEmail = '';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.loadEmail(); // initial load
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadEmail(); // reload on language change
    });
  }

  loadEmail() {
    this.translate.get('CONTACT.EMAIL').subscribe((email: string) => {
      this.translatedEmail = email;
    });
  }
}
