import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ShiftService } from '../services/shift.service';

@Component({
  selector: 'app-shift-end',
  templateUrl: './shift-end.component.html',
  styleUrls: ['../app.component.css']
})
export class ShiftEndComponent implements OnInit {
  endShiftForm: FormGroup;
  loadingLogin = false;
  endShift = {litres_dispenser1: 0, litres_dispenser2: 0}
  formError = {}
  username = '';
  myDate = new Date();
  currentPrice: any = 0;
  shiftId: string;
  constructor(
    private authService: ApiService,
    private formBuilder: FormBuilder,
    private shiftService: ShiftService,
      private router: Router
  ) { 
    this.username = localStorage.getItem("name");  
    this.currentPrice = localStorage.getItem("current_price");
    this.shiftId = localStorage.getItem("shiftId");
  }

  ngOnInit(): void {
    this.initendShiftForm();
  }

  initendShiftForm() {
    this.endShiftForm = this.formBuilder.group({
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
   handleForm(endShiftForm) {
    if(endShiftForm.valid){
      this.loadingLogin = true;
      endShiftForm.value['name'] = this.username;
      endShiftForm.value['price'] = this.currentPrice;
      endShiftForm.value['shiftId'] = this.shiftId;
      console.log(endShiftForm, '----here is the form');
      this.shiftService.endShift(endShiftForm.value).subscribe(
        (response) => {
          this.loadingLogin = false;
          try {
            console.log(response, '----here is the response');
            //this.commonService.showSnakeBar(response.message);
            setTimeout(() => {
              //location.reload();
              this.router.navigate(['shift-start']);
              localStorage.clear();
            }, 5)
            this.endShiftForm.reset();
            this.formError = {};
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
    }else{
      // the form is not valid
    }
  }


}
