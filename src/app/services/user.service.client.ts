import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

// injecting service into module
@Injectable()

export class UserService {

  constructor(private _http: HttpClient) {}

  baseUrl = environment.baseUrl;

  createUser(user: User) {
    return this._http.post(this.baseUrl + '/api/user', user);
    // user._id = (Number(this.users[this.users.length - 1]._id) + 1).toString();
    // this.users.push(user);
    // return user._id;
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
