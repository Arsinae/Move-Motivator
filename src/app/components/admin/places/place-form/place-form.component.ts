import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Place } from '@app/models/game/places';
import { PlacesService } from '@app/services/server-data/places/places.service';
import { PlaceStorageService } from '@app/services/storage/place-storage.service';
import { GeoPoint } from 'firebase/firestore';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent implements OnInit {

  public place: Place = new Place();
  public coordinate: {longitude: number, latitude: number} = {longitude: 0, latitude: 0};
  public file: File = null;

  constructor(
    public dialogRef: MatDialogRef<PlaceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {place: Place},
    private _placeStorageService: PlaceStorageService,
    private _placeService: PlacesService
  ) { }

  ngOnInit(): void {
    this.place = this.data.place;
    this.coordinate.longitude = this.data.place.pos.longitude;
    this.coordinate.latitude = this.data.place.pos.latitude;
  }

  public closeDialog(): void {
    this.dialogRef.close(this.place);
  }

  public onFileSelected(event: any) {
    if (event.files && event.files.length > 0) {
      this.file = event.files[0];
    }
  }

  public createPlace() {
    this._placeStorageService.uploadPlaceFile(this.file).then(async uploadedFile => {
      this.place.imgSrc = await this._placeStorageService.getUrl(uploadedFile.ref);
      this.place.pos = new GeoPoint(this.coordinate.longitude, this.coordinate.latitude);
      const uploadedPlace = this._placeService.uploadPlace(this.place);
      this.place.id = (await uploadedPlace).id;
      this.closeDialog();
    });
  }
}
