import { Component, OnInit, Input } from '@angular/core';
import { ToolDelivery } from 'src/app/models/tools/tool-delivery';
import { FormGroup, FormControl } from '@angular/forms';
import { TranslationService } from 'angular-l10n';
import { ToolDeliveryService } from '../tool-delivery.service';
import { Tool } from 'src/app/models/tools/tool';
import { Employee } from 'src/app/models/hr/employee';

@Component({
  selector: 'app-tool-delivery-form',
  templateUrl: './tool-delivery-form.component.html',
  styleUrls: ['./tool-delivery-form.component.scss']
})
export class ToolDeliveryFormComponent {

  private toolDelivery: ToolDelivery;

  public employee: Employee;
  public employees: Array<Employee>;
  public tool: Tool;
  public tools:Array<Tool>;

  public canShowToolDeliveryFormForChange: boolean;
  public toolDeliveryForm: FormGroup;
  public applyTranslate: string;
  public cancelTranslate: string;
  public deleteTranslate: string;

  @Input() canShowToolDeliveryForm: boolean;

  constructor(public translation: TranslationService, private toolDeliveryService: ToolDeliveryService) {
    this.setSelectes();
    this.createForm();
    this.translation.translationChanged().subscribe(
      () => {
        this.applyTranslate = this.translation.translate('apply');
        this.cancelTranslate = this.translation.translate('cancel');
        this.deleteTranslate = this.translation.translate('delete');
      }
    );
    this.toolDeliveryService.variableToolDelivery.subscribe((toolDelivery: ToolDelivery) => {
      if (toolDelivery && toolDelivery.id > -1) {
        this.canShowToolDeliveryFormForChange = true;
        this.canShowToolDeliveryForm = true;
        this.toolDelivery = toolDelivery;
        this.setToolDelivery(toolDelivery);
      }
    })
  }

  private setSelectes() :void {
    this.tools = [];
    this.tools = this.toolDeliveryService.getAllTools();
    this.employees = [];
    this.employees = this.toolDeliveryService.getAllEmployees();
  }

  private createForm(): void {
    this.toolDeliveryForm = new FormGroup({
      shortname: new FormControl(null),
      tool: new FormControl(null),
      dateOfIssue: new FormControl(null),
      dateOfReturn: new FormControl(),
      description: new FormControl(),
    })
  }

  private getToolDelivery(): ToolDelivery {
    const toolDelivery = new ToolDelivery();
    toolDelivery.employee = this.toolDeliveryForm.get('shortname').value;
    toolDelivery.tool = this.toolDeliveryForm.get('tool').value;
    toolDelivery.dateOfIssue = this.toolDeliveryForm.get('dateOfIssue').value;
    toolDelivery.dateOfReturn = this.toolDeliveryForm.get('dateOfReturn').value;
    toolDelivery.description = this.toolDeliveryForm.get('description').value;
    console.log(this.employee);
    console.log(this.tool);
    console.table(toolDelivery);
    return toolDelivery;
  }

  private clearForm(): void {
    this.toolDeliveryForm.reset();
  }

  private isCorrectDateOrder():boolean {
    let dateOfReturn = this.toolDeliveryForm.get('dateOfReturn').value;
    let dateOfIssue = this.toolDeliveryForm.get('dateOfIssue').value;
    if(dateOfReturn === null) {
      return true;
    }
    else if(dateOfReturn != null && dateOfReturn > dateOfIssue) {
      return true;
    }
    else {
      return false;
    }
  }

  public onSave(): void {
    this.toolDeliveryService.add(this.getToolDelivery());
    this.clearForm();
  }

  public onChange(): void {
    this.toolDeliveryService.change(this.getToolDelivery(), this.toolDelivery);
    this.clearForm();
    this.setViewForm();
  }

  private setViewForm(): void {
    this.canShowToolDeliveryFormForChange = false;
    this.canShowToolDeliveryForm = false;
  }

  public onCancel(): void {
    this.clearForm();
    this.setViewForm();
  }

  public onDelete(): void {
    this.toolDeliveryService.remove(this.toolDelivery);
    this.clearForm();
    this.setViewForm();
  }

  private setToolDelivery(tool: ToolDelivery): void {
    this.toolDeliveryForm.get('shortname').setValue(tool.employee);
    this.toolDeliveryForm.get('tool').setValue(tool.tool);
    this.toolDeliveryForm.get('dateOfIssue').setValue(tool.dateOfIssue);
    this.toolDeliveryForm.get('dateOfReturn').setValue(tool.dateOfReturn);
    this.toolDeliveryForm.get('description').setValue(tool.description);
  }
}