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
  }

  login() {
    this.errorFlag = false;
    this.username = this.myloginForm.value.username;
    this.password = this.myloginForm.value.password;
    this.userService.findUserByCredentials(this.username, this.password)
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/user', user._id]);
        } else {
          this.errorFlag = true;
        }
      });
  }

  ngOnInit() {
    console.log('login page!' + this.username);
  }

}
