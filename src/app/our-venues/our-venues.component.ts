import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-venues',
  templateUrl: './our-venues.component.html',
  styleUrl: './our-venues.component.css'
})
export class OurVenuesComponent implements OnInit {
  venues = [
    {
      name: 'Grand Ballroom',
      imageUrl: 'assets/grand-ballroom.jpg',
      description: 'An elegant space for large events and conferences.'
    },
    // ... 다른 venues 데이터
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
