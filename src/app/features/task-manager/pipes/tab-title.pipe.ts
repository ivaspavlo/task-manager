import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'tabTitle',
  standalone: true
})
export class TabTitlePipe implements PipeTransform {
  #translate: TranslateService = inject(TranslateService);

  transform(title: string, qty?: number): string {
    return `${this.#translate.instant(title)} (${qty || 0})`;
  }
}
