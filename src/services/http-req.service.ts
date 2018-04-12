import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SingleStock} from '../../model/single-stock';
import {UserStocks} from '../../model/user-stocks';

@Injectable()
export class HttpReqService {

  constructor(private http: HttpClient, ) { }

  getUserStocks(userId): Observable<any> {
    return this.http.get<any>('/getUserStocks/' + userId);
  }

  dataFromBackend(): Observable<any> {
    return this.http.get<SingleStock[]>('/stocks');
  }

  buyClickPost(buyData): Observable<any> {
    console.log('inside buyClick POST ', buyData);
    return this.http.post<any>('/stocks/buyPost', {buyData});
  }

  sellClick(sellData): Observable<any> {
    console.log('sellClick ');
    return this.http.post<any>('/stocks/sell', {StockData : sellData.StockData, UserStocks: sellData.UserStocks });
  }

  createUserAccIfNeeded(userId): Observable<any> {
    return this.http.get<any>('/initUserAccountIfNeeded/' + userId);
  }

}
