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
import { UserAccountComponent } from './user-account/user-account.component';
import { UserStockComponent } from './user-stock/user-stock.component';
import {HttpReqService} from '../services/http-req.service';
import {StockService} from '../services/stock.service';

import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    SingleStockComponent,
    BuyDialogComponent,
    UserAccountComponent,
    UserStockComponent
  ],
  entryComponents: [
    BuyDialogComponent,
    UserAccountComponent,
    UserStockComponent
  ],
  imports: [
    BrowserModule,
    AngularMatModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [WebSocketService, HttpReqService, StockService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
