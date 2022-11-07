import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';

// service import
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(
        private storageService: StorageService,
        private navController: NavController
    ) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (!this.storageService.isUserPresent()) {
        this.navController.navigateRoot('login');
        return false;
      }
      return true;
    }
}
