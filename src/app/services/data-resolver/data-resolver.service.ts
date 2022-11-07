import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';

// service import
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class DataResolverService {

    userId: any;

    constructor(
        private ds: ApiService,
        private storageService: StorageService
    ) {
        this.userId = this.storageService.getUserID();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.ds.getUserData(this.userId).pipe(
            take(1),
            map(userdata => userdata)
        )
    }
}
