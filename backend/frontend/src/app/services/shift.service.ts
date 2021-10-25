import { Injectable } from '@angular/core';
import { ApiUrls } from '../config/app-urls';
import { CommonHttpService } from './common-http.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  constructor(private commonHttpService: CommonHttpService, private appUrls: ApiUrls) { }

  /*
* @name ShiftStart
* @param  
* @description handle shift start request
* @return Observable
*/
  shiftStart(params) {
    return this.commonHttpService.post(this.appUrls.api.shiftStart, params)
  }

    /*
* @name Payout
* @param  
* @description handle shift start request
* @return Observable
*/
payout(params) {
  return this.commonHttpService.post(this.appUrls.api.payout, params)
}

    /*
* @name Price Change
* @param  
* @description handle shift start request
* @return Observable
*/
priceChange(params) {
  return this.commonHttpService.post(this.appUrls.api.priceChange, params)
}

    /*
* @name fetch price
* @param  
* @description handle shift start request
* @return Observable
*/
fetchPrice() {
  return this.commonHttpService.get(this.appUrls.api.fetchPrice)
}

    /*
* @name fetch all shifts
* @param  
* @description handle shift start request
* @return Observable
*/
fetchAllShifts() {
  return this.commonHttpService.get(this.appUrls.api.shiftsListing)
}

  /*
* @name EndShift
* @param  
* @description handle shift start request
* @return Observable
*/
endShift(params) {
  return this.commonHttpService.post(this.appUrls.api.endShift, params)
}

}
