import { inject, Injectable } from '@angular/core';
import { ref, Storage, StorageReference, uploadBytesResumable, UploadTask, deleteObject, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PlaceStorageService {

  private readonly storage: Storage = inject(Storage);

  constructor() { }

  uploadPlaceFile(file: File): UploadTask {
    const storageRef = ref(this.storage, `places/${file.name}`);
    return uploadBytesResumable(storageRef, file);
  }

  getUrl(ref: StorageReference) {
    return getDownloadURL(ref);
  }

  deletePlaceFile(filePath: string): void {
    const storageRef = ref(this.storage, filePath);
    deleteObject(storageRef)
  }
}
