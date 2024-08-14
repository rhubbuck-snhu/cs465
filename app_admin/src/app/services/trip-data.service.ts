import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
    ) {}
  url = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api/';
  tripUrl = `${this.baseUrl}trips/`;

  // getTrips() : Observable<Trip[]> {
  //   return this.http.get<Trip[]>(this.url);
  // }
  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
    .get(this.tripUrl)
    .toPromise()
    .then(response => response as Trip[])
    .catch(this.handleError)
  }

  // addTrip(formData: Trip) : Observable<Trip> {
  //   return this.http.post<Trip>(this.url, formData);
  // }
  public addTrip(formData: Trip): Promise<Trip> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    console.log('Inside TripDataService#addTrip');
    console.log(formData);
    return this.http
    .post(this.tripUrl, formData, httpOptions)
    .toPromise()
    .then(response => response as Trip[])
    .catch(this.handleError);
  }

  // getTrip(tripCode: string) : Observable<Trip[]> {
  //   return this.http.get<Trip[]>(this.url + '/' + tripCode);
  // }
  // public getTrip(tripCode: string): Promise<Trip> {
  //   return this.http
  //   .get(this.tripUrl + tripCode)
  //   .toPromise()
  //   .then(response => response as Trip)
  //   .catch(this.handleError);
  // }
  public async getTrip(tripCode: string): Promise<Trip[]> {
    console.log(`Inside TripDataService#getTrip('${tripCode}')`);
    return await lastValueFrom(
      this.http
        .get<Trip[]>(`${this.baseUrl}/trips/${tripCode}`)
    ).catch(this.handleError);
  }

  // updateTrip(formData: Trip) : Observable<Trip> {
  //   return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  // }
  public async updateTrip(formData: Trip): Promise<Trip[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('travlr-token')}`
      })
    };
    console.log(`Inside TripDataService#updateTrip('${formData.code}')`);
    console.log(formData)
    return this.http
    .put(this.tripUrl + formData.code, formData, httpOptions)
    .toPromise()
    .then(response => response as Trip[])
    .catch(this.handleError)
    // return await lastValueFrom(
    //   this.http
    //     .put<Trip[]>(`${this.baseUrl}/trips/${formData.code}`, formData)
    // ).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
