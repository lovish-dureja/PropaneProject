import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';
import { ShiftService } from '../services/shift.service';


@Component({
  selector: 'app-start-shift',
  templateUrl: './start-shift.component.html',
  styleUrls: ['../app.component.css']
})

export class StartShiftComponent implements OnInit {
  startShiftForm: FormGroup;
  loadingLogin = false;
  startShift = {litres_dispenser1: 0, litres_dispenser2: 0}
  formError = {}
  username = '';
  myDate = new Date();
  currentPrice:any = 0;
  constructor(private commonService: CommonService,
    private authService: ApiService,
    private formBuilder: FormBuilder,
    private shiftService: ShiftService,
      private router: Router) { 
    this.username = localStorage.getItem("name");  
    // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    this.initStartShiftForm();
    this.fetchCurrentPrice();
  }

  fetchCurrentPrice(){
    this.shiftService.fetchPrice().subscribe(
      (response) => {
        this.loadingLogin = false;
        try {
          this.currentPrice = response.data[0].price;
          console.log(this.currentPrice, '----here is the response');
          localStorage.setItem('current_price',this.currentPrice) 
          //this.commonService.showSnakeBar(response.message);
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
  }

  initStartShiftForm() {
    this.startShiftForm = this.formBuilder.group({
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
   handleForm(startShiftForm) {
    if(startShiftForm.valid){
      this.loadingLogin = true;
      startShiftForm.value['name'] = this.username;
      startShiftForm.value['price'] = this.currentPrice;
      console.log(startShiftForm, '----here is the form');
      this.shiftService.shiftStart(startShiftForm.value).subscribe(
        (response) => {
          this.loadingLogin = false;
          try {
            console.log(response, '----here is the response');
            //this.commonService.showSnakeBar(response.message);
            localStorage.setItem("shiftId", response.data._id)
            setTimeout(() => {
              //location.reload();
              this.router.navigate(['current-shift']);
            }, 5)
            this.startShiftForm.reset();
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
