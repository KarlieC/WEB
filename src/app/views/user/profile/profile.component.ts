import {Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

import {NgForm} from '@angular/forms';
// import {SharedService} from '../../../services/shared.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') profileForm: NgForm;

  user = {
    _id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };
  userId: String;
  // newUsername: String;
  // newFirstname: String;
  // newLastname: String;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      console.log('user id: ' + this.userId);
      this.userService.findUserById(this.userId.toString())
        .subscribe((data: any) => {
          console.log(data);
          this.user = data;
        });
    });
  }

  updateUser() {
    if (this.profileForm.value.username) {
      this.user.username = this.profileForm.value.username;
    }
    if (this.profileForm.value.firstname) {
      this.user.firstName = this.profileForm.value.firstname;
    }
    if (this.profileForm.value.lastname) {
      this.user.lastName = this.profileForm.value.lastname;
    }
    if (this.profileForm.value.lastname) {
      this.user.lastName = this.profileForm.value.lastname;
    }
    this.activatedRoute.params.subscribe(params => {
      this.userService.updateUser(this.user).subscribe(
        (user: User) => {
          this.user = user;
          alert('update succeed!');
        }
      );
    }, (error: any) => {
        alert('update failed!');
      }
    );
  }

  // updateUser() {
  //   this.activatedRoute.params.subscribe(params => {
  //     this.user._id = params['uid'];
  //   });
  //
  //   this.userService.findUserById(this.user._id.toString())
  //     .subscribe((data: any) => {
  //       this.user = data;
  //       // console.log(data);
  //     });
  // }
}
