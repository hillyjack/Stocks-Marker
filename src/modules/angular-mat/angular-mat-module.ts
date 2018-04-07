import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatCheckboxModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatTableModule, MatDialogModule, MatSelectModule, MatFormFieldModule],
  declarations: []
})
export class AngularMatModule { }
