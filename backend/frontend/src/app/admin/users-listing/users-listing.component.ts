import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html',
  styleUrls: ['./users-listing.component.css']
})
export class UsersListingComponent implements OnInit {
  loadingLogin: boolean;
  allUsers:any = [];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.userService.fetchAllUsers().subscribe(
      (response) => {
        this.loadingLogin = false;
        try {
            this.allUsers = response.data;
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
}
