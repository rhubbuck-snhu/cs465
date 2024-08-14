// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
// import { TripDataService } from '../services/trip-data.service';
// import { Trip } from '../models/trip';


// @Component({
//   selector: 'app-edit-trip',
// standalone: true,
// imports: [CommonModule, ReactiveFormsModule],
// templateUrl: './edit-trip.component.html',
// styleUrl: './edit-trip.component.css'
//   })
  
//   export class EditTripComponent implements OnInit {
//     public editForm!: FormGroup;
//     trip!: Trip;
//     submitted = false;
//     message : string = '';

//     constructor(
//       private formBuilder: FormBuilder,
//       private router: Router,
//       private tripDataService: TripDataService
//       ) {}
      
//       ngOnInit() : void{
//         // Retrieve stashed trip ID
//         let tripCode = localStorage.getItem("tripCode");
//         if (!tripCode) {
//         alert("Something wrong, couldn't find where I stashed tripCode!");
//         this.router.navigate(['']);
//         return;
//         }
//         console.log('EditTripComponent::ngOnInit');
//         console.log('tripcode:' + tripCode);
//         this.editForm = this.formBuilder.group({
//         _id: [],
//         code: [tripCode, Validators.required],
//         name: ['', Validators.required],
//         length: ['', Validators.required],
//         start: ['', Validators.required],
//         resort: ['', Validators.required],
//         perPerson: ['', Validators.required],
// image: ['', Validators.required],
// description: ['', Validators.required]
// })
// this.tripDataService.getTrip(tripCode)
// .subscribe({
// next: (value: any) => {
// this.trip = value;
// // Populate our record into the form
// this.editForm.patchValue(value[0]);
// if(!value)
// {
// this.message = 'No Trip Retrieved!';
// }
// else{
// this.message = 'Trip: ' + tripCode + ' retrieved';
// }
// console.log(this.message);
// },
// error: (error: any) => {
// console.log('Error: ' + error);
// }
// })
// }
    
//     public onSubmit() {
//       this.submitted = true;
//       if(this.editForm.valid)
//         {
//         this.tripDataService.updateTrip(this.editForm.value)
//         .subscribe({
//         next: (value: any) => {
//         console.log(value);
//         this.router.navigate(['']);
//         },
//         error: (error: any) => {
//         console.log('Error: ' + error);
//         }
//         })
//       }
//       }
//       // get the form short name to access the form fields
//       get f() { return this.editForm.controls; }
//       }
      
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-trip',
  standalone: true,
imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tripService: TripDataService

  ) { }

  ngOnInit() {
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log("EditTripComponent#onInit found tripCode " + tripCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    })

    console.log(
      "EditTripComponent#onInit calling TripDataService#getTrip('" +
        tripCode +
        "')"
    );

    this.tripService.getTrip(tripCode)
      .then(data => {
        // console.log(data);
        
        this.editForm.patchValue(data[0]);
        
        console.log("patched")
        // using editForm.setValue() will throw a console error
      })

  }

  onSubmit() {
    this.submitted = true;

    if(this.editForm.valid){
      this.tripService.updateTrip(this.editForm.value)
        .then( data => {
            console.log(data);
            
            this.router.navigate(['list-trips']);
        });
    }
  }

  // get the form short name to access the form fields
  get f() {
    return this.editForm.controls;
  }

}