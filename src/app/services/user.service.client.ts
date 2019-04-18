import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Http, RequestOptions, Response} from '@angular/http';
import {SharedService} from './shared.service';
import {Router} from '@angular/router';

// injecting service into module
@Injectable()

export class UserService {

  options = new RequestOptions();

  constructor(private _http: HttpClient, private sharedService: SharedService, private router: Router) {}

  baseUrl = environment.baseUrl;
  createUser(user: User) {
    return this._http.post(this.baseUrl + '/api/user', user);
    // user._id = (Number(this.users[this.users.length - 1]._id) + 1).toString();
    // this.users.push(user);
    // return user._id;
  }

  login(username: String, password: String) {
    this.options.withCredentials = true;
    const body = {username: username, password: password};
    return this._http.post(this.baseUrl + '/api/login', body, { withCredentials: true });
  }

  logOut() {
    this.options.withCredentials = true;
    this.sharedService.user = '';
    return this._http.post(this.baseUrl + '/api/logout', '', { withCredentials: true });
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;
    const user = {
      username: username,
      password: password
    };
    return this._http.post(this.baseUrl + '/api/register', user, { withCredentials: true });
  }

  loggedin() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/loggedin', '', { withCredentials: true });
    // .map(
    //       (user: any) => {
    //         if (user !== 0) {
    //           this.sharedService.user = user;
    //           return true;
    //         } else {
    //           this.router.navigate(['/login']);
    //           return false;
    //         }
    //       }
    //     );
  }

  findUserByCredentials(username: String, password: String) {
    return this._http.get<User>(this.baseUrl + '/api/user?username=' + username + '&password=' + password);
    // return this.users.find(function (user) {
    //   return user.username === username && user.password === password;
    // });
  }

  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId);
    // return this.users.find(function (user) {
    //   return user._id === userId;
    // });
  }

  findUserByUsername(username: String) {
    console.log(this.baseUrl + '/api/user?username=' + username);
    return this._http.get(this.baseUrl + '/api/user?username=' + username);
  }

  updateUser(user: any) {
    const url =  this.baseUrl + '/api/user/' + user._id;
    return this._http.put(url, user);
  }

  deleteUser(userId: String) {
    return this._http.delete<User>(this.baseUrl + '/api/user/' + userId);
    // for (const i in this.users) {
    //   if (this.users[i]._id === userId) {
    //     const j = +i;
    //     this.users.splice(j, 1);
    //     break;
    //   }
    // }
  }
}
