import { Injectable, EventEmitter } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { HistoryService } from '../../../../../services/history.service';
import { Tool } from 'src/app/models/tools/tool';
import { ToolDTO } from 'src/app/swagger-client/dist/client/model/toolDTO';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private idForChange: number = 0;
  private tools: Array<Tool> = [];
  private toolsDTO: Array<ToolDTO> = [];

  public addNewTool = new EventEmitter<Tool>();
  public removeTool = new EventEmitter<number>();
  public changeTool = new EventEmitter<Tool>();
  public variableTool = new EventEmitter<Tool>();

  constructor(private storageService: StorageService, private history: HistoryService) {
    this.tools = this.getAllTools();
    this.toolsDTO = this.getAllToolsDTO();
    history.setKey(StorageKey.ToolsHistory);
  }

  private getAllToolsDTO(): Array<ToolDTO> {
    let tools: Array<ToolDTO> = [];
    if (this.storageService.hasKey(StorageKey.Tools)) {
      tools = this.storageService.getTypedArray(StorageKey.Tools);
    }
    return tools;
  }

  public getAllTools(): Array<Tool> {
    let tools: Array<Tool> = [];
    if (this.storageService.hasKey(StorageKey.Tools)) {
      tools = this.storageService.getTypedArray(StorageKey.Tools);
    }
    return tools;
  }

  public getToolByName(nameTool: string): Tool {
    return this.tools.find(d => d.nameTool == nameTool);
  }

  private incrementIndex(): number {
    let index: number = 1;
    if (this.toolsDTO.length > 0) {
      const allLeght = this.toolsDTO.length;
      index = this.toolsDTO[allLeght - 1].id + 1;
    }
    return index;
  }

  private getToolId(id: number): number {
    return this.tools.map(l => { return l.id; }).indexOf(id);
  }
  public add(t: Tool): void {
    let tool: ToolDTO = t;
    tool.id = this.incrementIndex();

    this.tools.push(t);
    this.toolsDTO.push(tool);
    this.addNewTool.emit(t);

    this.storageService.addData(StorageKey.Tools, tool);
    this.history.addPointInHistory('Tool', tool);
  }

  public remove(tool: Tool): void {
    const idForRemove = this.getToolId(tool.id);

    this.tools.splice(idForRemove, 1);
    this.toolsDTO.splice(idForRemove, 1);

    this.removeTool.emit(idForRemove);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Tool', tool, tool);
  }

  public change(tool: Tool, oldTool: Tool): void {
    const changableTool: ToolDTO =
    {
      id: oldTool.id,
      nameTool: tool.nameTool,
      checkDate: tool.checkDate
    }

    this.idForChange = this.getToolId(oldTool.id);
    this.tools[this.idForChange] = <Tool>changableTool;
    this.toolsDTO[this.idForChange] = changableTool;

    this.changeTool.emit(<Tool>changableTool);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('Department', changableTool, <ToolDTO>oldTool);
  }

  public getToolIdForChange(): number {
    return this.idForChange;
  }

  public setToolById(id: number): void {
    const tool = this.tools.find((tool: Tool) => tool.id == id);
    this.variableTool.emit(tool);
  }

  private saveArrayToLocalStorage(): void {
    this.storageService.deleteData(StorageKey.Tools);
    this.toolsDTO.forEach((tool: ToolDTO) => {
      this.storageService.addData(StorageKey.Tools, tool);
    })
  }
}
