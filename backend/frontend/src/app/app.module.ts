import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/http-interceptor';



// services
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { CommonHttpService } from './services/common-http.service';
import { CommonService } from './services/common.service';
import { ApiUrls } from './config/app-urls';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayoutComponent } from './payout/payout.component';
import { PriceChangeComponent } from './price-change/price-change.component';
import { StartShiftComponent } from './start-shift/start-shift.component';
import { CurrentShiftComponent } from './current-shift/current-shift.component';
import { ShiftEndComponent } from './shift-end/shift-end.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersListingComponent } from './admin/users-listing/users-listing.component';
import { ShiftListingComponent } from './admin/shift-listing/shift-listing.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PayoutComponent,
    PriceChangeComponent,
    StartShiftComponent,
    CurrentShiftComponent,
    ShiftEndComponent,
    AdminDashboardComponent,
    UsersListingComponent,
    ShiftListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule   ,
    ReactiveFormsModule
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [
    UserService,
    ApiService,
    CommonHttpService,
    CommonService,
    ApiUrls,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
