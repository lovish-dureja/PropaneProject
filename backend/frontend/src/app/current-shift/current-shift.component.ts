import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-shift',
  templateUrl: './current-shift.component.html',
  styleUrls: ['../app.component.css']
})
export class CurrentShiftComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handlePayout(){
    this.router.navigate(["payout"]);
  }

  handlePriceChange(){
    this.router.navigate(["price-change"]);
  }

  handleEndShift(){
    this.router.navigate(["end-shift"]);
  }
}
