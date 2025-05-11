// home.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ImageModule } from 'primeng/image';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ActivatedRoute } from '@angular/router';

// <-- import TranslateModule
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    DividerModule,
    ImageModule,
    AnimateOnScrollModule,
    TranslateModule    // <-- add this so the translate pipe is available
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const section = document.getElementById(fragment);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
