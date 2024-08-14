import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trips } from '../data/trips';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css',
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }

  private getStuff(): void {
    console.log('Searching for associated trips');
    this.tripDataService
      .getTrips()
      .then(foundTrips => {
        this.message = foundTrips.length > 0 ? '' : 'No trips found';
        this.trips = foundTrips;
      });
    // this.tripDataService.getTrips()
    // .subscribe({
    //   next: (value: any) => {
    //     this.trips = value;
    //     if(value.length > 0) {
    //     this.message = 'There are ' + value.length + ' trips available.';
    //     }
    //     else {
    //     this.message = 'There were no trips retireved from the database';
    //     }
    //     console.log(this.message);
    //   },
    //   error: (error: any) => {
    //     console.log('Error: ' + error);
    //   }
    // })
  }
        
  
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
