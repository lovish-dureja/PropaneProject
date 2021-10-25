import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ShiftService } from '../services/shift.service';

@Component({
  selector: 'app-price-change',
  templateUrl: './price-change.component.html',
  styleUrls: ['../app.component.css']
})
export class PriceChangeComponent implements OnInit {

  priceChangeForm: FormGroup;
  loadingLogin = false;
  priceChange = {current_price: 0, new_price: 0}
  formError = {}
  constructor(
    private authService: ApiService,
    private formBuilder: FormBuilder,
    private shiftService: ShiftService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.initPriceChangeForm();
  }

  initPriceChangeForm() {
    this.priceChangeForm = this.formBuilder.group({
      current_price: [0, Validators.required],
      new_price: [0, Validators.required]
  });
  }

  
   /*
  * @name handleForm
  * @param Form
  * @description handle form                       
  * @return none
  */
   handleForm(priceChangeForm) {
    if(priceChangeForm.valid){
      this.loadingLogin = true;
      this.shiftService.priceChange(priceChangeForm.value).subscribe(
        (response) => {
          this.loadingLogin = false;
          try {
            //this.commonService.showSnakeBar(response.message);
            setTimeout(() => {
              //location.reload();
              localStorage.setItem('current_price',priceChangeForm.value('new_price')) 
              this.router.navigate(['current-shift']);
            }, 5)
            this.priceChangeForm.reset();
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
