import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  user: User;
  username: String;
  password: String;
  v_password: String;
  errorFlagUsername: boolean;
  errorFlagPassword: boolean;
  errorMsgUsername = 'Username exists!';
  errorMsgPassword = 'Password mis-matching!';

  constructor(private userService: UserService, private router: Router, private sharedService: SharedService) {
  }

  register() {
    this.errorFlagUsername = false;
    this.errorFlagPassword = false;
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.v_password = this.registerForm.value.v_password;
    // if (this.userService.findUserByUsername(this.username)) {
    //   this.errorFlagUsername = true;
    // } else if (this.v_password !== this.password) {
    //   this.errorFlagPassword = true;
    // } else {
    //   const user: User = new User('', this.username, this.password, '', '');
    //   this.userService.createUser(user);
    //   this.router.navigate(['/user', user._id]);
    // }
    if (this.v_password !== this.password) {
      this.errorFlagPassword = true;
      return;
    }
    this.userService.register(this.username, this.password).subscribe(
      (data: any) => {
        console.log(data);

        this.sharedService.user = data;

        this.sharedService.test = data;

        console.log('reg-sharedSvc: ' + this.sharedService.user._id);

        this.router.navigate(['/user', this.sharedService.user._id]);
      },
      (err: any) => {
        this.errorFlagUsername = true;
      }
    );
    // const newUser: User = new User(undefined, this.username, this.password, undefined, undefined, undefined);
    // this.userService.createUser(newUser).subscribe(
    //   (user: User) => {
    //     if (user) {
    //       alert('Registration succeed!');
    //       this.router.navigate(['/user', user._id]);
    //     }
    //   }
    // );
  }

  ngOnInit() {}
}
