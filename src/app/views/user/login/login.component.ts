import { Component, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';
import {User} from '../../../models/user.model.client';
import {Router} from '@angular/router';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @ViewChild('f') myloginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding
  errorFlag: boolean;
  errorMsg = 'Invalid username or password!';

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {
  }

  login() {
    this.errorFlag = false;
    // fetch data from login form
    this.username = this.myloginForm.value.username;
    this.password = this.myloginForm.value.password;
    // call client side to sent login information
    this.userService.login(this.username, this.password).subscribe((user: any) => {
      this.sharedService.user = user;
      this.router.navigate(['/user', user._id]);
    }, (error: any) => {
      this.errorFlag = true;
      console.log(error);
    });
    // this.userService.findUserByCredentials(this.username, this.password)
    //   .subscribe((user: User) => {
    //     if (user) {
    //       this.router.navigate(['/user', user._id]);
    //     } else {
    //       this.errorFlag = true;
    //     }
    //   });
  }

  ngOnInit() {
    // console.log('login page!' + this.username);
  }

}
