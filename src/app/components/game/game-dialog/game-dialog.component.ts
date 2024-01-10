import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDisplayGameDialog, IGameDialog } from '@app/models/game/dialog';

@Component({
  selector: 'app-game-dialog',
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.scss']
})
export class GameDialogComponent implements OnInit {

  public currentIndex: number = 0;
  public currentDialog: IGameDialog = null;

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDisplayGameDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this._getCurrentDialog();
  }

  private _getCurrentDialog() {
    const dialog = this.data.dialogs.find(dialog => dialog.index === this.currentIndex);
    if (dialog) {
      this.currentDialog = dialog;
    } else {
      this.dialogRef.close();
    }
  }

}
