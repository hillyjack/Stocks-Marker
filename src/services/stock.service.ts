import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WebSocketService} from './web-socket.service';
import {HttpReqService} from './http-req.service';

@Injectable()
export class StockService {

  constructor(private httpService: HttpReqService, private ioService: WebSocketService) { }

  getAllStocks(): Observable<any> {
    return this.httpService.dataFromBackend();
  }

  updateStocksPrices(): Observable<any> {
    return this.ioService.getSocketsPrice();
  }

  getStocksByUser(userId): Observable<any> {
    return this.httpService.getUserStocks(userId);
  }

  sellStocks(sellData): Observable<any> {
    return this.httpService.sellClick(sellData);
  }

  buyStocks(buyData): Observable<any> {
    return this.httpService.buyClickPost(buyData);
  }

  createUserAccount(userId): Observable<any> {
    return this.httpService.createUserAccIfNeeded(userId);
  }
}
