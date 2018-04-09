import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SingleStock} from '../../../model/single-stock';
import {UserStocks} from '../../../model/user-stocks';
import {HttpReqService} from '../../services/http-req.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  userStocks: UserStocks[] = [];
  StocksData: SingleStock[] = [];


  constructor(private httpService: HttpReqService, public dialogRef: MatDialogRef<UserAccountComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userStocks = data.userStocks;
    this.StocksData = data.StocksData;
    console.log('this.userStocks', this.userStocks);
    console.log('this.StocksData ', this.StocksData);
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
    this.httpService.sellClick(event).subscribe((data) => {
      const res = data.result;
      console.log('res', res);
      this.userStocks = res;
    });
  }
}
