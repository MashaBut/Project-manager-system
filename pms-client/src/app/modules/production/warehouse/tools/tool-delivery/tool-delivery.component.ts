import { Component} from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-tool-delivery',
  templateUrl: './tool-delivery.component.html',
  styleUrls: ['./tool-delivery.component.scss']
})
export class ToolDeliveryComponent {

  public canShowToolDeliveryForm: boolean = false;
  public addTranslate: string;

  constructor(public translation: TranslationService) {
    this.translation.translationChanged().subscribe(
      () => {
        this.addTranslate = this.translation.translate('add');
      }
    );
  }  

  public showToolDeliveryForm(): void {
    this.canShowToolDeliveryForm = (!this.canShowToolDeliveryForm) ? true : false;
  }
}
