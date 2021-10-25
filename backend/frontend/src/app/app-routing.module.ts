import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from  './admin/admin.guard';
import { StartShiftComponent } from './start-shift/start-shift.component';
import { CurrentShiftComponent } from './current-shift/current-shift.component';
import { PayoutComponent } from './payout/payout.component';
import { PriceChangeComponent } from './price-change/price-change.component';
import { ShiftEndComponent } from './shift-end/shift-end.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UsersListingComponent } from './admin/users-listing/users-listing.component';
import { ShiftListingComponent } from './admin/shift-listing/shift-listing.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'shift-start', component: StartShiftComponent},
  { path: 'current-shift', component: CurrentShiftComponent},
  { path: 'payout', component: PayoutComponent},
  { path: 'price-change', component: PriceChangeComponent},
  { path: 'end-shift', component: ShiftEndComponent},
  { path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'admin/userListing', component: UsersListingComponent},
  { path: 'admin/shiftListing', component: ShiftListingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
