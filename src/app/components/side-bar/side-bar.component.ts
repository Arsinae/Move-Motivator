import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityFormComponent } from '@app/modals/activity-form/activity-form.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAddActivityModal(): void {
    this.dialog.open(ActivityFormComponent, {minWidth: '30%'}).afterClosed().subscribe(res => {
      if (res) {
        // TODO: reload user distance data
      }
    })
  }
}
