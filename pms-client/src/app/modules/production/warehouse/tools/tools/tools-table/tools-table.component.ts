import { Component, OnInit, Input } from '@angular/core';
import { ToolsService } from '../tools.service';
import { TranslationService } from 'angular-l10n';
import { GridColumn } from 'src/app/common/ui/grid/model/grid-column';
import { Tool } from 'src/app/models/tools/tool';

@Component({
  selector: 'app-tools-table',
  templateUrl: './tools-table.component.html',
  styleUrls: ['./tools-table.component.scss']
})
export class ToolsTableComponent implements OnInit {

  private nameToolTranslate: string;
  private checkDateTranslate: string;

  public columns = new Array<GridColumn>();
  public tools: Array<Tool> = [];
  public tracktionField = 'id';

  @Input() locked = false;
  @Input() hideSelection = false;
  @Input() focusEntityId = 0;

  constructor(private toolService: ToolsService, public translation: TranslationService) {
    this.initTools();
  }

  ngOnInit() {
    this.translation.translationChanged().subscribe(
      () => {
        this.nameToolTranslate = this.translation.translate('nameTool');
        this.checkDateTranslate = this.translation.translate('checkDate');
      }
    );
    this.toolService.addNewTool.subscribe((tool: Tool) => {
      this.tools.push(tool);
    })
    this.toolService.removeTool.subscribe((toolId: number) => {
      this.tools.splice(toolId, 1);
    })
    this.toolService.changeTool.subscribe((tool: Tool) => {
      this.tools[this.toolService.getToolIdForChange()] = tool;
    })
    this.initGrid();
  }

  private initTools(): void {
    this.toolService.getAllTools().forEach((tool: Tool) => {
      this.tools.push(tool);
    })
  }

  private initGrid(): void {
    this.columns.push({ header: '№', field: 'id' });
    this.columns.push({ header: this.nameToolTranslate, field: 'nameTool' });
    this.columns.push({ header: this.checkDateTranslate, field: 'checkDate' });;
  }

  public onRowClick(tool: Tool): void {
    this.focusEntityId = tool.id;
    this.toolService.setToolById(this.focusEntityId);
  }
}
