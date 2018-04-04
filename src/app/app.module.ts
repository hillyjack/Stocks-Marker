import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';


import { AppComponent } from './app.component';
import { SingleStockComponent } from './single-stock/single-stock.component';
import {AngularMatModule} from '../modules/angular-mat/angular-mat-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {WebSocketService} from '../services/web-socket.service';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SingleStockComponent,
    BuyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AngularMatModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
