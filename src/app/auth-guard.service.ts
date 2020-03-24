import { Injectable } from '@angular/core';
import { StorageService } from "./storage.service";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { NavController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private storageService: StorageService, private navController: NavController) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.storageService.isUserPresent()) {
      this.navController.navigateRoot('login');
      return false;
    }
    return true;
  }


}
