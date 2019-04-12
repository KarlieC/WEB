import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

import {NgForm} from '@angular/forms';

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

  constructor(private userService: UserService, private router: Router) {
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
    const newUser: User = new User(undefined, this.username, this.password, undefined, undefined, undefined);
    this.userService.createUser(newUser).subscribe(
      (user: User) => {
        if (user) {
          alert('Registration succeed!');
          this.router.navigate(['/user', user._id]);
        }
      }
    );
    // this.userService.findUserByUsername(this.username).subscribe(
    //     (user: User) => {
    //       if (user) {
    //         console.log('test user exist');
    //         this.errorFlagUsername = true;
    //       }
    //     },
    //   (error: any) => {
    //     const newUser: User = new User('', this.username, this.password, '', '', '');
    //     this.userService.createUser(newUser).subscribe(
    //       (user: User) => {
    //         if (user) {
    //           alert('Registration succeed!');
    //           this.router.navigate(['/user', user._id]);
    //         }
    //       }
    //     );
    //   }
    //  );
  }

  ngOnInit() {}
}
