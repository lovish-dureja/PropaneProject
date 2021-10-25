import { Injectable } from '@angular/core';
import { CommonHttpService } from './common-http.service';
import { ApiUrls } from "../config/app-urls";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private commonHttpService: CommonHttpService, private appUrls: ApiUrls) { }

    /*
  * @name login
  * @param  
  * @description handle user login request
  * @return Observable
  */
    login(params) {
      return this.commonHttpService.post(this.appUrls.api.login, params)
    }

    /*
  * @name fetching all the users
  * @param  
  * @description handle all the users
  * @return Observable
  */
    fetchAllUsers() {
      return this.commonHttpService.get(this.appUrls.api.userListing)
    }
}
