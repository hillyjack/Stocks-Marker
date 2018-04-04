import {Component, Input, OnInit} from '@angular/core';
import {SingleStock} from '../../../model/single-stock';
import {BuyDialogComponent} from '../buy-dialog/buy-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-single-stock',
  templateUrl: './single-stock.component.html',
  styleUrls: ['./single-stock.component.css']
})
export class SingleStockComponent implements OnInit {
  @Input()
  data: SingleStock;
  constructor(public dialog: MatDialog) { }
  openBuyDialog(): void {
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '250px',
      data: { /*name: this.name, animal: this.animal*/ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
  ngOnInit() {
  }

}
