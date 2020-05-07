import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule,MatSelectModule,MatButtonModule,MatToolbarModule, MatNativeDateModule, MatDatepickerModule, MatIconModule, MatCheckboxModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatRadioModule,  MatDialogModule, MatSidenavModule, MatDividerModule, MatPaginatorModule, MatMenuModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


const materials =[FlexLayoutModule, MatMenuModule,MatSidenavModule, MatDividerModule,
   MatCardModule,
  MatPaginatorModule,MatDialogModule,MatDatepickerModule,MatTableModule,
  MatSelectModule,MatButtonModule,CommonModule,MatToolbarModule,MatNativeDateModule,
  MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule,
  FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule]

@NgModule({
  declarations: [],
  imports: [materials],
  exports : [materials]
})
export class MaterialModule { }
