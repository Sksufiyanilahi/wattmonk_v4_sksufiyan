import { Injectable } from '@angular/core';
import { User } from "./model/user.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  isUserPresent(): boolean {
    return localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  removeUser() {
    localStorage.removeItem('user')
  }

  setJWTToken(token: string) {
    localStorage.setItem('token', token);
  }

  getJWTToken() {
    return localStorage.getItem('token');
  }
}
