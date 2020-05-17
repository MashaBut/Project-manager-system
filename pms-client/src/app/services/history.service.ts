import { Injectable, EventEmitter } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { HistoryDTO } from 'src/app/swagger-client/dist/client/model/historyDTO';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private pointsInHistory: Array<HistoryDTO> = [];
  private currentHistory: HistoryDTO = null;
  public changeArrayofHistory = new EventEmitter<History>();
  private key: StorageKey;

  constructor(private storageService: StorageService) {
  }

  public setKey(key: StorageKey): void {
    this.key = key;
    this.pointsInHistory = this.getAllHistoryDTO();
  }

  public getAllHistory(): Array<History> {
    let arrayOfHistory: Array<History> = [];
    if (this.storageService.hasKey(this.key)) {
      arrayOfHistory = this.storageService.getTypedArray(this.key);
    }
    return arrayOfHistory;
  }

  private getAllHistoryDTO(): Array<HistoryDTO> {
    let arrayOfHistory: Array<HistoryDTO> = [];
    if (this.storageService.hasKey(this.key)) {
      arrayOfHistory = this.storageService.getTypedArray(this.key);
    }
    return arrayOfHistory;
  }

  public addPointInHistory<T>(type: string, newInfo?: T, oldInfo?: T): void {
    this.currentHistory = <HistoryDTO>{
      id: this.incrementIndex(),
      date: new Date(),
      type: type,
      newInfo: newInfo,
      oldInfo: oldInfo
    };
    this.storageService.addData(this.key, this.currentHistory);
    this.pointsInHistory.push(this.currentHistory);
    this.changeArrayofHistory.emit(<History>this.currentHistory);
  }

  private incrementIndex(): number {
    let index: number = 0;
    if (this.pointsInHistory != null) {
      index = this.pointsInHistory.length;
    }
    return index;
  }
}