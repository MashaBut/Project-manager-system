import { Injectable, EventEmitter } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { Tool } from 'src/app/models/tools/tool';
import { Employee } from 'src/app/models/hr/employee';
import { ToolDeliveryDTO } from 'src/app/swagger-client/dist/client/model/toolDeliveryDTO';
import { ToolDelivery } from 'src/app/models/tools/tool-delivery';

@Injectable({
  providedIn: 'root'
})
export class ToolDeliveryService {

  private idForChange: number = 0;
  private toolsDelivery: Array<ToolDelivery> = [];
  private toolsDeliveryDTO: Array<ToolDeliveryDTO> = [];
  private key: StorageKey;

  public addNewToolDelivery = new EventEmitter<ToolDelivery>();
  public removeToolDelivery = new EventEmitter<number>();
  public changeToolDelivery = new EventEmitter<ToolDelivery>();
  public variableToolDelivery = new EventEmitter<ToolDelivery>();
  constructor(private storageService: StorageService, private history: HistoryService) {
    this.toolsDelivery = this.getAllToolsDelivery();
    this.toolsDeliveryDTO = this.getAllToolDeliveryDTO();
    history.setKey(StorageKey.ToolDeliveryHistory);
    this.key = StorageKey.ToolsDelivery;
  }

  public getAllTools(): Array<Tool> {
    let tools: Array<Tool> = [];
    if (this.storageService.hasKey(StorageKey.Tools)) {
      tools = this.storageService.getTypedArray(StorageKey.Tools);
    }
    return tools;
  }

  public getAllEmployees(): Array<Employee> {
    let employees: Array<Employee> = [];
    if (this.storageService.hasKey(StorageKey.EmployeesStorageKey)) {
      employees = this.storageService.getTypedArray(StorageKey.EmployeesStorageKey);
    }
    return employees;
  }

  private getAllToolDeliveryDTO(): Array<ToolDeliveryDTO> {
    let toolsDelivery: Array<ToolDeliveryDTO> = [];
    if (this.storageService.hasKey(this.key)) {
      toolsDelivery = this.storageService.getTypedArray(this.key);
    }
    return toolsDelivery;
  }

  public getAllToolsDelivery(): Array<ToolDelivery> {
    let toolsDelivery: Array<ToolDelivery> = [];
    if (this.storageService.hasKey(this.key)) {
      toolsDelivery = this.storageService.getTypedArray(this.key);
    }
    return toolsDelivery;
  }


  private incrementIndex(): number {
    let index: number = 1;
    if (this.toolsDeliveryDTO.length > 0) {
      const allLeght = this.toolsDeliveryDTO.length;
      index = this.toolsDeliveryDTO[allLeght - 1].id + 1;
    }
    return index;
  }

  private getToolDeliveryId(id: number): number {
    return this.toolsDelivery.map(l => { return l.id; }).indexOf(id);
  }

  public add(t: ToolDelivery): void {
    let toolDelivery: ToolDeliveryDTO = t;
    toolDelivery.id = this.incrementIndex();

    this.toolsDelivery.push(t);
    this.toolsDeliveryDTO.push(toolDelivery);
    this.addNewToolDelivery.emit(t);

    this.storageService.addData(this.key, toolDelivery);
    this.history.addPointInHistory('ToolDelivery', toolDelivery);
  }

  public remove(tool: ToolDelivery): void {
    const idForRemove = this.getToolDeliveryId(tool.id);

    this.toolsDelivery.splice(idForRemove, 1);
    this.toolsDeliveryDTO.splice(idForRemove, 1);

    this.removeToolDelivery.emit(idForRemove);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('ToolDelivery', tool, tool);
  }

  public change(tool: ToolDelivery, oldTool: ToolDelivery): void {
    const changableTool: ToolDeliveryDTO = tool;
    changableTool.id = oldTool.id;

    this.idForChange = this.getToolDeliveryId(oldTool.id);
    this.toolsDelivery[this.idForChange] = <ToolDelivery>changableTool;
    this.toolsDeliveryDTO[this.idForChange] = changableTool;

    this.changeToolDelivery.emit(<ToolDelivery>changableTool);
    this.saveArrayToLocalStorage();
    this.history.addPointInHistory('ToolDelivery', changableTool, <ToolDeliveryDTO>oldTool);
  }

  public getToolDeliveryIdForChange(): number {
    return this.idForChange;
  }

  public setToolDeliveryById(id: number): void {
    const toolDelivery = this.toolsDelivery.find((toolDelivery: ToolDelivery) => toolDelivery.id == id);
    this.variableToolDelivery.emit(toolDelivery);
  }

  private saveArrayToLocalStorage(): void {
    this.storageService.deleteData(this.key);
    this.toolsDeliveryDTO.forEach((toolDelivery: ToolDeliveryDTO) => {
      this.storageService.addData(this.key, toolDelivery);
    })
  }
}
