import { Component, OnInit, Inject } from '@angular/core';
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

  constructor(public dialogRef: MatDialogRef<UserAccountComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userStocks = data.userStocks;
    console.log(this.userStocks);
  }

  ngOnInit() {
    if (this.userStocks) {
      alert('User Have No Purchases');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
