import {Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';


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
  userId = '';
  // newUsername: String;
  // newFirstname: String;
  // newLastname: String;
  constructor(private userService: UserService, private router: Router,
              private activatedRoute: ActivatedRoute, private sharedService: SharedService) {
  }

  ngOnInit() {
    // // this.userId = this.sharedService.user._id;
    // console.log(this.sharedService.user);
    // this.activatedRoute.params.subscribe(params => {
    //   // this.userId = params['uid'];
    //   console.log(JSON.parse(this.sharedService.user));
    //   console.log(this.sharedService.test);
    //   // console.log('user id: ' + this.userId);
    //   this.userService.findUserById(this.userId.toString())
    //     .subscribe((data: any) => {
    //       console.log(data);
    //       this.user = data;
    //     });
    // });
    this.activatedRoute.params.subscribe((params: any) => {this.userId = params.uid; });
    console.log('user id: ' + this.userId);
    this.user = this.sharedService.user;
  }

  logOut() {
    this.userService.logOut().subscribe(
      (data: any) => this.router.navigate(['/login'])
    );
  }

  updateUser() {
    // this.userService.updateUser(this.user).subscribe();
    if (this.profileForm.value.username) {
      this.user.username = this.profileForm.value.username;
    }
    if (this.profileForm.value.firstname) {
      this.user.firstName = this.profileForm.value.firstname;
    }
    if (this.profileForm.value.lastname) {
      this.user.lastName = this.profileForm.value.lastname;
    }
    if (this.profileForm.value.email) {
      this.user.email = this.profileForm.value.email;
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
