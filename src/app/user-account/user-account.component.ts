import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SingleStock} from '../../../model/single-stock';
import {UserStocks} from '../../../model/user-stocks';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  userStocks: UserStocks[] = [];
  StocksData: SingleStock[] = [];
  onSellClick: any;

  constructor(public dialogRef: MatDialogRef<UserAccountComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userStocks = data.userStocks;
    this.StocksData = data.StocksData;
    console.log('UserAccountComponent this.userStocks', this.userStocks);
    console.log('UserAccountComponent this.StocksData ', this.StocksData);
    this.onSellClick = new EventEmitter<any>(true);
  }

  ngOnInit() {
    if (!this.userStocks) {
      alert('User Have No Purchases');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sellButtonClick(event) {
    console.log('sellButtonClick event', event);
    this.onSellClick.emit(event);
  }
}
