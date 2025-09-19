import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { LANG_LIST } from '@app/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    TranslatePipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  #translate = inject(TranslateService);

  protected langList = LANG_LIST;

  ngOnInit() {
    this.#translate.addLangs(['de', 'en']);
    this.#translate.setFallbackLang('en');
    this.#translate.use('en');
  }

  public onLangSelect(value: string): void {
    this.#translate.use(value);
  }
}
