import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ShiftService } from '../services/shift.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['../app.component.css']
})
export class PayoutComponent implements OnInit {

  payoutForm: FormGroup;
  loadingLogin = false;
  startShift = {litres_dispenser1: 0, litres_dispenser2: 0}
  formError = {}
  username = '';
  constructor(
    private authService: ApiService,
    private formBuilder: FormBuilder,
    private shiftService: ShiftService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.initPayoutForm();
  }

  initPayoutForm() {
    this.payoutForm = this.formBuilder.group({
      litres_dispenser1: [0, Validators.required],
      litres_dispenser2: [0, Validators.required]
  });
  }

   /*
  * @name handleForm
  * @param Form
  * @description handle form                       
  * @return none
  */
   handleForm(payoutForm) {
    if(payoutForm.valid){
      this.loadingLogin = true;
      this.shiftService.payout(payoutForm.value).subscribe(
        (response) => {
          this.loadingLogin = false;
          try {
            //this.commonService.showSnakeBar(response.message);
            setTimeout(() => {
              //location.reload();
              this.router.navigate(['current-shift']);
            }, 5)
            this.payoutForm.reset();
            this.formError = {};
          } catch (e) {

          }
        },
        (err) => {
          let response = err.json();
          this.loadingLogin = false;
          if (response.message) {
          } else {
          }
        },
        () => { }
      );
    }else{
      // the form is not valid
    }
  }

}
