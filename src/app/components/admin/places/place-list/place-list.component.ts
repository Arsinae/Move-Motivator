import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmModalComponent } from '@app/modals/confirm-modal/confirm-modal.component';
import { Place } from '@app/models/game/places';
import { AdminFunctionService } from '@app/services/functions/admin-function.service';
import { PlacesService } from '@app/services/server-data/places/places.service';
import { firstValueFrom } from 'rxjs';
import { PlaceFormComponent } from '../place-form/place-form.component';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss']
})
export class PlaceListComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'name', 'dungeons', 'action'];
  public dataSource = new MatTableDataSource<Place>([]);
  public lastIndex: number = undefined;
  public hasNext: boolean = false;

  private PAGE_SIZE: number = 10;

  constructor(
    private dialog: MatDialog,
    private placeService: PlacesService,
    private adminFunctionService: AdminFunctionService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this._getPlacesList();
  }

  private _getPlacesList() {
    firstValueFrom(this.placeService.getPlacesList(this.lastIndex, this.PAGE_SIZE)).then(places => {
      console.log(places);
      this.dataSource.data = this.dataSource.data.concat(places);
      this.lastIndex = (places.length > 0) ? places[places.length - 1].index : null;
      this.hasNext = places?.length === this.PAGE_SIZE ? true : false;
    }).catch(err => {
      console.log(err);
    })
  }

  public createNewPlace() {
    const newPlaceDialogSubscription = this.dialog.open(PlaceFormComponent, {
      minWidth: 800,
      data: {place: new Place(this.dataSource.data[0].index + 1)}
    }).afterClosed().subscribe((res: Place) => {
      if (res && res.id) {
        this.dataSource.data.unshift(res);
        this.dataSource.data = this.dataSource.data;
        this.askUnlockNewPlace(res);
      }
      newPlaceDialogSubscription.unsubscribe();
    })
  }

  public loadMore() {
    this._getPlacesList();
  }

  public askUnlockNewPlace(place: Place) {
    this.dialog.open(ConfirmModalComponent, {
      data: {title: 'Débloquer pour tous les joueurs', message: 'Le lieu sera directement accessible pour tous les joueurs'}
    }).afterClosed().subscribe(res => {
      if (res === true) {
        this._unlockPlaceForAllUsers(place.id);
      }
    })
  }

  public _unlockPlaceForAllUsers(placeId: string) {
    this.adminFunctionService.unlockPlaceForAllUsers(placeId).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }
}
