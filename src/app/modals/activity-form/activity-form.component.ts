import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Activity, ActivityType } from '@app/models/activity';
import { ActivityFunctionService } from '@app/services/functions/activity-function.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {

  public activityForm: FormGroup;
  public ActivityType = ActivityType;

  public error: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<ActivityFormComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private activityService: ActivityFunctionService
  ) {
    this.activityForm = this.formBuilder.group({
      distance: [null, [Validators.required, Validators.min(1)]],
      type: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  storeActivity() {
    const activity: Activity = {
      distance: this.activityForm.value.distance,
      type: this.activityForm.value.type
    };
    this.activityService.callAddDistance(activity).then(res => {
      this.snackBar.open('Distance enregistrée', 'OK', {duration: 3000});
      this.dialogRef.close();
    }).catch(err => {
      console.error(err);
      this.error = 'Erreur durant l\'enregistrement de la distance.';
    })
  }

}
