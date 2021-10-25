import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TOKEN_NAME, USER_STORAGE_KEY, ROLE_KEY, USER_ROLE_STORAGE_KEY, DM_PREFIX } from './common.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: String = '';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private SERVER_URL = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }
  /*
  * Get user token from local storage
  * @name getToken
  * @param  none
  * @return {String}
  */
  getToken(): string {
    return localStorage.getItem(DM_PREFIX + TOKEN_NAME);
  }

  /*
   * Set user token on local storage
   * @name setToken
   * @param  token {String}
   * @return none
   */
  setToken(token: string): void {
    localStorage.setItem(DM_PREFIX + TOKEN_NAME, token);
  }


  /*
   * Set user data on local storage
   * @name setUserData
   * @param  {Object}
   * @return none
   */
  setUserData(data): void {
    console.log(data, '=----here is the data in the localstorage');
    let info = {name: data.name, id: data.id};
    localStorage.setItem('name', data.name )
    localStorage.setItem(ROLE_KEY, data.roles);
    //localStorage.setItem(USER_ROLE_STORAGE_KEY, data.user_roles);
  }

  /*
   * Remove user token
   * @name removeToken
   * @param  none
   * @return none
   */
  removeToken(): void {
    if (this.getToken()) {
      localStorage.removeItem(DM_PREFIX + TOKEN_NAME);
      localStorage.removeItem(DM_PREFIX + USER_STORAGE_KEY);
      //localStorage.removeItem(ROLE_KEY);
      //localStorage.removeItem(USER_ROLE_STORAGE_KEY);
    }
  }


  /*
  * Logout user
  * @name logout
  * @param  user {Object}
  * @return Promise
  */
  // logout() {
  //   return this.commonHttpService.post('logout', {});
  // }

  /*
  * get current login user details
  * @name getCurrentUserDetails
  * @param  type {String} local,remote local:Get user details from local storage, 
  * remote: get user details from server side
  * @return Promise
  */
  getCurrentUserDetails(type = 'local') {
    if (type == 'local') {
      if (this.isUserLogin()) {
        return JSON.parse(localStorage.getItem(DM_PREFIX + USER_STORAGE_KEY));
      } else {
        // logout user
      }
    }else {
      return "";
    }
  }

  /*
  * Logout user
  * @name logout
  * @param  user {Object}
  * @return Promise
  */
  isUserLogin(type = 'local') {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

}
