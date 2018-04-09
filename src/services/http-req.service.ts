import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SingleStock} from '../../model/single-stock';

@Injectable()
export class HttpReqService {

  constructor(private http: HttpClient, ) { }

  getUserStocks(userId): Observable<any> {
    return this.http.get<any>('/getUserStocks/' + userId);
  }

  dataFromBackend(): Observable<any> {
    return this.http.get<SingleStock[]>('/stocks');
  }

  buyClick(data): Observable<any> {
    console.log('inside buyClick ', data);
    return this.http.get<any>('/stocks/buy/' + data.userId + '/' + data.stockMarketID + '/' + data.stockAmount + '/' + data.purchasePrice);
  }

  sellClick(sellData): Observable<any> {
    console.log('sellClick ');
    return this.http.post<any>('/stocks/sell', {StockData : sellData.StockData, UserStocks: sellData.UserStocks });
  }

  createUserAccIfNeeded(userId): Observable<any> {
    return this.http.get<any>('/initUserAccountIfNeeded/' + userId);
  }

}
