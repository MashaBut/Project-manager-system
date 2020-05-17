import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from 'src/app/common/ui/grid/model/grid-column';
import { ToolDelivery } from 'src/app/models/tools/tool-delivery';
import { ToolDeliveryService } from '../tool-delivery.service';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-tool-delivery-table',
  templateUrl: './tool-delivery-table.component.html',
  styleUrls: ['./tool-delivery-table.component.scss']
})
export class ToolDeliveryTableComponent implements OnInit {

  private employeeTranslate: string;
  private toolTranslate: string;
  private dateOfIssueTranslate: string;
  private dateOfReturnTranslate: string;
  private descriptionTranslate: string;
  
  public columns = new Array<GridColumn>();
  public toolsDelivery: Array<ToolDelivery> = [];
  public tracktionField = 'id';

  @Input() locked = false;
  @Input() hideSelection = false;
  @Input() focusEntityId = 0;

  constructor(private toolDeliveryService: ToolDeliveryService, public translation: TranslationService) {
    this.initToolDelivery();
  }

  ngOnInit() {
    this.translation.translationChanged().subscribe(
      () => {
        this.employeeTranslate = this.translation.translate('namesurnameshort');
        this.toolTranslate = this.translation.translate('tool');
        this.dateOfIssueTranslate = this.translation.translate('dateOfIssue');
        this.dateOfReturnTranslate = this.translation.translate('dateOfReturn');
        this.descriptionTranslate = this.translation.translate('description');
      }
    );
    this.toolDeliveryService.addNewToolDelivery.subscribe((tool: ToolDelivery) => {
      this.toolsDelivery.push(tool);
    })
    this.toolDeliveryService.removeToolDelivery.subscribe((toolId: number) => {
      this.toolsDelivery.splice(toolId, 1);
    })
    this.toolDeliveryService.changeToolDelivery.subscribe((tool: ToolDelivery) => {
      this.toolsDelivery[this.toolDeliveryService.getToolDeliveryIdForChange()] = tool;
    })
    this.initGrid();
  }

  private initToolDelivery(): void {
    this.toolDeliveryService.getAllToolsDelivery().forEach((toolDelivery: ToolDelivery) => {
      this.toolsDelivery.push(toolDelivery);
    })
  }

  private initGrid(): void {
    this.columns.push({ header: '№', field: 'id' });
    this.columns.push({ header: this.employeeTranslate, field: 'employee.secondName' });
    this.columns.push({ header: this.toolTranslate, field: 'tool.nameTool' });
    this.columns.push({ header: this.dateOfIssueTranslate, field: 'dateOfIssue' });
    this.columns.push({ header: this.dateOfReturnTranslate, field: 'dateOfReturn' });
    this.columns.push({ header: this.descriptionTranslate, field: 'description' });
  }

  public onRowClick(tool: ToolDelivery): void {
    this.focusEntityId = tool.id;
    this.toolDeliveryService.setToolDeliveryById(this.focusEntityId);
  }
}
