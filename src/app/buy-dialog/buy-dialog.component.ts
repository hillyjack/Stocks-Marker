import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SingleStock} from '../../../model/single-stock';
import {UserStocks} from '../../../model/user-stocks';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.css']
})
export class BuyDialogComponent implements OnInit {
  buyDetails: SingleStock;
  userId: number;
  selected = 0;
  amountArr: number[] = Array.from(Array(100).keys());

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<BuyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.buyDetails = data.SingleStock;
    this.userId = data.userId;
  }

  ngOnInit() {
    this.createUserAccIfNeeded().subscribe((data) => {
      console.log('createUserAccIfNeeded ');
      const res = data.result;
      console.log(res);
    });
  }
  onBuyClick(): void {
    if (this.selected) {

      // const buyUserStock = new UserStocks(this.userId, this.buyDetails.stockMarketID, this.selected, this.buyDetails.CurrentPrice);
      console.log('buyStock ', this.userId, this.buyDetails.stockMarketID, this.selected, this.buyDetails.CurrentPrice);
      this.buyStock(this.userId, this.buyDetails.stockMarketID, this.selected, this.buyDetails.CurrentPrice).subscribe((data) => {
        const res = data.result;
        console.log(res);
      });
      this.dialogRef.close();
    } else { alert('You have to choose amount'); }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


  createUserAccIfNeeded(): Observable<any> {
    return this.http.get<any>('/initUserAccountIfNeeded/' + this.userId);
  }

  buyStock(userId, stockMarketID, stockAmount, purchasePrice):  Observable<any> {
    return this.http.get<any>('/stocks/buy/' + userId + '/' + stockMarketID + '/' + stockAmount + '/' + purchasePrice);
  }
}
