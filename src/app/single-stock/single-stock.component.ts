import {Component, Input, OnInit} from '@angular/core';
import {SingleStock} from '../../../model/single-stock';

@Component({
  selector: 'app-single-stock',
  templateUrl: './single-stock.component.html',
  styleUrls: ['./single-stock.component.css']
})
export class SingleStockComponent implements OnInit {
  @Input()
  data: SingleStock;
  constructor() { }

  ngOnInit() {
  }

}
