import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatCheckboxModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatTableModule, MatDialogModule],
  declarations: []
})
export class AngularMatModule { }
