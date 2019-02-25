import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

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
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) {
    this.username = 'hello world!';
  }

  login() {
    this.username = this.myloginForm.value.username;
    this.password = this.myloginForm.value.password;
    const user: User = this.userService.findUserByCredentials(this.username, this.password);
    if (user) {
      this.router.navigate(['/user', user._id]);
    } else {
      this.errorFlag = true;
      // this.errorMsg = 'Login Failed.';
    }
  }

  ngOnInit() {
    // this.users = UserService.getAllUser();
    console.log('login page!' + this.username);
  }

}
