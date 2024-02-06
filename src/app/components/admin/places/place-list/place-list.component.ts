import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from '@app/models/game/places';
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
  public page: number = 0;
  public lastIndex: number = undefined;
  public hasNext: boolean = false;

  private PAGE_SIZE: number = 10;

  constructor(
    private dialog: MatDialog,
    private placeService: PlacesService
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this._getPlacesList();
  }

  private _getPlacesList() {
    firstValueFrom(this.placeService.getPlacesList(this.lastIndex, this.PAGE_SIZE)).then(places => {
      console.log(places);
      this.dataSource.data = places;
      this.lastIndex = (places.length > 0) ? places[places.length - 1].index : null;
      this.hasNext = places?.length === this.PAGE_SIZE ? true : false;
    }).catch(err => {
      console.log(err);
    })
  }

  public createNewPlace() {
    const newPlaceDialogSubscription = this.dialog.open(PlaceFormComponent, {
      minWidth: 800,
      data: {place: new Place()}
    }).afterClosed().subscribe((res: Place) => {
      if (res && res.id) {
        this.dataSource.data.unshift(res);
      }
      newPlaceDialogSubscription.unsubscribe();
    })
  }

  public setPage(page: number) {
    this.page = page;
    this._getPlacesList();
  }
}
