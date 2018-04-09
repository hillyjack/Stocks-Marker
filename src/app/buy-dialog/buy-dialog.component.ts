import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SingleStock} from '../../../model/single-stock';


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

  constructor(public dialogRef: MatDialogRef<BuyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
    this.buyDetails = data.SingleStock;
    this.userId = data.userId;
  }

  ngOnInit() {}
  onBuyClick(): void {
    if (this.selected) {
      const data = {userId : this.userId, stockMarketID : this.buyDetails.stockMarketID, stockAmount : this.selected, purchasePrice : this.buyDetails.CurrentPrice};
      this.dialogRef.close(data);
    } else { alert('You have to choose amount'); }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
