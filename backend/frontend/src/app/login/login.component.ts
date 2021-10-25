import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonService } from '../services/common.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  loadingLogin = false;
  login = { name: "", pincode: ""}
  formError = {}
  constructor(private userService: UserService,
     private commonService: CommonService,
     private authService: ApiService,
     private formBuilder: FormBuilder,
       private router: Router,) { }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      pincode: ['', Validators.required]
  });
  }

  /*
  * @name handleForm
  * @param Form
  * @description handle form                       
  * @return none
  */
  handleForm(loginForm) {
    if(loginForm.valid){
      console.log(loginForm, 'here I am ')
      this.loadingLogin = true;
      this.userService.login(loginForm.value).subscribe(
        (response) => {
          this.loadingLogin = false;
          try {
            console.log(response, '----here is the response');
            //this.commonService.showSnakeBar(response.message);
            this.loginForm.reset();
            this.formError = {};
            this.authService.setToken(response['data']['token']);
            this.authService.setUserData(response['data']);
            if (response['data']['role'] == 1) {
              setTimeout(() => {
                this.router.navigate(['admin/dashboard']);
              }, 5)
            } else {
              setTimeout(() => {
                //location.reload();
                this.router.navigate(['shift-start']);
              }, 5)
            }
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
