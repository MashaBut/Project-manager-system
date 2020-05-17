import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent{

  public canShowToolsForm: boolean = false;
  public addTranslate: string;

  constructor(public translation: TranslationService) {
    this.translation.translationChanged().subscribe(
      () => {
        this.addTranslate = this.translation.translate('add');
      }
    );
  }

  public showToolsForm(): void {
    this.canShowToolsForm = (!this.canShowToolsForm) ? true : false;
  }
}
