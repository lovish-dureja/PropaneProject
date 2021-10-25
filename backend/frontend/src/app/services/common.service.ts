/**
  * @ngdoc Services
  * @name app.services.common
  * @description
  * The common service is used for getting and setting common vars used across the application
  * */

 import { Injectable } from '@angular/core';
 import { Router } from '@angular/router';
 import { Title } from '@angular/platform-browser';
 
 import { environment } from "../../environments/environment";
 
 @Injectable()
 export class CommonService {
 
   constructor(
     public router: Router,
     public titleService: Title) { }
 
   /**
   * Get api base url
   * @name getApiBaseUrl
   * @param  none
   * @return {String}
   */
   getApiBaseUrl() {
     return environment.apiUrl;
   }
 
   /**
   * logging console data
   * @name logging
   * @param  none
   * @return {String}
   */
   logging(data) {
     //console.log(data);
   }
 
 
   transErrorResponse(response) {
     response = response ? response.json() : {};
     return response;
   }
 
 
 
   /**
   * navigate user to given url
   * @name navigate
   * @param  url {String}
   * @return none
   */
   navigate(url) {
     this.router.navigate([url]);
   }
 
   navigateSkipLocation(url) {
     this.router.navigateByUrl(url, { skipLocationChange: true });
   }
 
   /**
   * set page title
   * @name title
   * @param  {String}
   * @return none
   */
   setTitle(title) {
     let appName = 'Propane Project';
     let pageTitle = appName;
     if (title.length > 0) {
       pageTitle = pageTitle + " | " + title;
     }
     this.titleService.setTitle(pageTitle);
   }
 
   setLocalStorage(key, value) {
     window.localStorage.setItem(DM_PREFIX + key, value);
   }
 
   removeLocalStorage(key) {
     window.localStorage.removeItem(DM_PREFIX + key);
   }
 
   getLocalStorage(key) {
     return window.localStorage.getItem(DM_PREFIX + key);
   }
 
   get2D( num ) {
     //console.log(num,'print he num here')
     if( num < 10 && num > 1 ) // Integer of less than two digits
     {
     //console.log('here')
         return "0" + num; // Prepend a zero!
     }
     return num // return string for consistency
 }
  capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
 }
   // getStateList(stateList){
   //   console.log(stateList[0].state,"print the state list here");
   //   let stateData = [];
   //   stateData[
   //     stateList[0].value = 'Australian Capital Territory',
   //     stateList[1].value = 'New South Wales'
   //   ]
   //   console.log(stateData,"print the state array here");
   // }
 }
 
 // Base token name
 export const TOKEN_NAME = "api_token";
 // Token header name
 export const TOKEN_HEADER_KEY = "Authorization";
 export const AUTH_PREFIX = "Bearer";
 // User detail Key name
 export const USER_STORAGE_KEY = "user";
 // User role Key name
 export const USER_ROLE_STORAGE_KEY = "user_roles";
 // All roles Key name
 export const ROLE_KEY = 'roles';
 
 export const DM_PREFIX = 'PPP_';
 
 