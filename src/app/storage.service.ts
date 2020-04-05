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

  isLocationAllowedOnIOS(): boolean {
    if (localStorage.getItem('ios_location_allowed') === null || localStorage.getItem('ios_location_allowed') === undefined) {
      return false;
    } else {
      return JSON.parse(localStorage.getItem('ios_location_allowed'));
    }
  }

  isLocationCheckedOnIOS(): boolean {
    if (localStorage.getItem('ios_location_checked') === null || localStorage.getItem('ios_location_checked') === undefined) {
      return false;
    } else {
      return JSON.parse(localStorage.getItem('ios_location_checked'));
    }
  }

  setLocationCheckedOnIOS(status: boolean) {
    localStorage.setItem('ios_location_checked', JSON.stringify(status));
  }

  setLocationAllowedOnIOS(status: boolean) {
    localStorage.setItem('ios_location_allowed', JSON.stringify(status));
  }

  
  setParentId(parentId: string): any {
    localStorage.setItem('parentId', parentId);
  }

  getParentId(): string {
    return localStorage.getItem('parentId');
  }
}
