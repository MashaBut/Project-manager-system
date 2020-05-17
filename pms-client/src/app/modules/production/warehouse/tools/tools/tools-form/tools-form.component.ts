import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslationService } from 'angular-l10n';
import { Tool } from 'src/app/models/tools/tool';
import { ToolsService } from '../tools.service';

@Component({
  selector: 'app-tools-form',
  templateUrl: './tools-form.component.html',
  styleUrls: ['./tools-form.component.scss']
})
export class ToolsFormComponent {

  private tool: Tool = new Tool();
  public canShowToolsFormForChange: boolean;
  public toolsForm: FormGroup;
  public applyTranslate: string;
  public cancelTranslate: string;
  public deleteTranslate: string;

  @Input() canShowToolsForm: boolean;

  constructor(public translation: TranslationService, private toolsService: ToolsService) {
    this.createForm();
    this.translation.translationChanged().subscribe(
      () => {
        this.applyTranslate = this.translation.translate('apply');
        this.cancelTranslate = this.translation.translate('cancel');
        this.deleteTranslate = this.translation.translate('delete');
      }
    );
    this.toolsService.variableTool.subscribe((tool: Tool) => {
      if (tool && tool.id > -1) {
        this.canShowToolsFormForChange = true;
        this.canShowToolsForm = true;
        this.tool = tool;
        this.setTool(tool);
      }
    })
  }

  private createForm(): void {
    this.toolsForm = new FormGroup({
      nameTool: new FormControl(null),
      checkDate: new FormControl(null)
    })
  }

  private getTool(): Tool {
    const tool = new Tool();
    tool.nameTool = this.toolsForm.get('nameTool').value;
    tool.checkDate = this.toolsForm.get('checkDate').value;
    return tool;
  }


  private clearForm(): void {
    this.toolsForm.reset();
  }

  public onSave(): void {
    this.toolsService.add(this.getTool());
    this.clearForm();
  }

  public onChange(): void {
    this.toolsService.change(this.getTool(), this.tool);
    this.clearForm();
    this.setViewForm();
  }

  private setViewForm(): void {
    this.canShowToolsFormForChange = false;
    this.canShowToolsForm = false;
  }

  public onCancel(): void {
    this.clearForm();
    this.setViewForm();
  }

  public onDelete(): void {
    this.toolsService.remove(this.tool);
    this.clearForm();
    this.setViewForm();
  }

  private setTool(tool: Tool): void {
    this.toolsForm.get('nameTool').setValue(tool.nameTool);
    this.toolsForm.get('checkDate').setValue(tool.checkDate);
  }
}
