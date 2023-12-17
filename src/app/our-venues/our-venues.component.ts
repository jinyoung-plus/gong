import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-venues',
  templateUrl: './our-venues.component.html',
  styleUrls: ['./our-venues.component.css']
})
export class OurVenuesComponent implements OnInit {
  images = [
    '/assets/grandballroom1.png',
    '/assets/grandballroom2.png',
    '/assets/middleroom1.png',
    '/assets/middleroom2.png',
    '/assets/smallroom1.png',
    '/assets/smallroom2.png',
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
