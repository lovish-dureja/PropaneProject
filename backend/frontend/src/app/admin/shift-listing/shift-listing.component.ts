import { Component, OnInit } from '@angular/core';
import { ShiftService } from 'src/app/services/shift.service';

@Component({
  selector: 'app-shift-listing',
  templateUrl: './shift-listing.component.html',
  styleUrls: ['./shift-listing.component.css']
})
export class ShiftListingComponent implements OnInit {
  loadingLogin: boolean;
  shiftListing: [];
  constructor(
    private shiftService: ShiftService,
  ) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.shiftService.fetchAllShifts().subscribe(
      (response) => {
        this.loadingLogin = false;
        try {
            this.shiftListing = response.data;
        } catch (e) {
        }
      },
      (err) => {
        let response = err.json();
        this.loadingLogin = false;
        if (response.message) {
          // this.handleServerFormError(response.errors)
          // this.commonService.showSnakeBar(response.message);
        } else {
          // this.commonService.commonSnakeBar();
        }
      },
      () => { }
    );
  }
}
