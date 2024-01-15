import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDisplayGameDialog, IGameDialog, IOnCompleteDialog } from '@app/models/game/dialog';

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
      this.closeDialog();
    }
  }

  public get BackgroundImage(): string {
    return `linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .2)), url(${this.data?.place?.imgSrc})`
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public completeDialog(): void {
    if (this.currentDialog.onComplete) {
      this.currentDialog.onComplete.forEach(completionStep => {
        this._processCompletion(completionStep);
      })
    } else {
      this.closeDialog();
    }
  }

  private _processCompletion(completionStep: IOnCompleteDialog) {
    switch (completionStep.type) {
      case 'nextIndex': {
        this.currentIndex = <number>completionStep.value;
        this._getCurrentDialog();
        break;
      }

      case 'endDialog': {
        this.closeDialog();
        break;
      }
    }
  }
}
