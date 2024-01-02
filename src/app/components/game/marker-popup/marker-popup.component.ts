import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss']
})
export class MarkerPopupComponent implements OnInit {

  public title: string = 'Test';
  public imgSrc: string = null;

  constructor() { }

  ngOnInit(): void {
  }

}
