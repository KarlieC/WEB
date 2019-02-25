import {Component, OnInit, Input, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('f') profileForm: NgForm;

  user: User;
  userId: String;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
          this.userId = params['uid'];
        }
      );
    this.user = this.userService.findUserById(this.userId);
  }

  updateUser() {
    console.log(this.profileForm.value.lastname);
    const updatedUser = new User(this.userId
      , this.profileForm.value.username
      , this.user.password
      , this.profileForm.value.firstname
      , this.profileForm.value.lastname);
    this.user = this.userService.updateUser(this.userId, updatedUser);
    // console.log(this.user.lastName);
  }
}
