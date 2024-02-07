import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IGameDialog } from '@app/models/game/dialog';
import { Place } from '@app/models/game/places';
import { PlacesService } from '@app/services/server-data/places/places.service';
import { PlaceStorageService } from '@app/services/storage/place-storage.service';
import { GeoPoint } from 'firebase/firestore';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss']
})
export class PlaceFormComponent implements OnInit, OnDestroy {

  public place: Place = new Place();
  public coordinate: {longitude: number, latitude: number} = {longitude: 0, latitude: 0};
  public file: File = null;
  public dialog: IGameDialog = new IGameDialog(0);

  public editor: Editor;
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

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
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor?.destroy();
    }
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
      const uploadedPlace = await this._placeService.uploadPlace(this.place);
      if (this.place.id === undefined) {
        await this._placeService.uploadPlaceDialog(uploadedPlace.id, this.dialog);
      }
      this.place.id = uploadedPlace.id;
      this.closeDialog();
    });
  }
}
