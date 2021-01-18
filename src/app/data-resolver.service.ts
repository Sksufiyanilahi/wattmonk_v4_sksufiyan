import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve <Observable<any>>{
  userId: any;

  constructor(private ds: ApiService,private storageService:StorageService) {
    this.userId = this.storageService.getUserID();
   }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.ds.getUserData(this.userId).pipe(
      take(1),
      map(userdata => userdata)
    )
  }
}
