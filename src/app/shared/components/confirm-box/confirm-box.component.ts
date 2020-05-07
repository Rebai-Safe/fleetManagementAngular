import { Component,  Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent  {

  constructor(
    public dialogRef: MatDialogRef<ConfirmBoxComponent>,
    
    //we will receives as a parameter from the component opening the dialog
    @Inject(MAT_DIALOG_DATA) public message: string) { }
 
   //When the “No” button is clicked, it will simply close the dialog.s
    onNoClick(): void {
    this.dialogRef.close();
  }

}
