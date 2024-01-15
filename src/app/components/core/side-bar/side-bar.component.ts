import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivityFormComponent } from '@app/modals/activity-form/activity-form.component';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUserObservable().subscribe(res => {
      this.isAdmin = res?.isAdmin;
    })
  }

  openAddActivityModal(): void {
    this.dialog.open(ActivityFormComponent, {minWidth: '30%'}).afterClosed().subscribe(res => {
      if (res) {
        // TODO: reload user distance data
      }
    })
  }
}
