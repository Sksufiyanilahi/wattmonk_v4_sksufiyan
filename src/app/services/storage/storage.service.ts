import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { User } from 'src/app/models/user.model';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { Storage } from '@ionic/storage';
import { DesginDataHelper } from 'src/app/pages/home/design/design.component';


@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public data: any;
    public prelimCharges: any;
    public permitCharges: any;

    constructor(
        private firebase: FirebaseX,
        private deviceStorage: Storage,
    ) {
    }

    isUserPresent(): boolean {
        return localStorage.getItem('user') !== null && localStorage.getItem('user') !== undefined;
    }

    setUser(user: User, jwt?: string) {
        localStorage.setItem('user', JSON.stringify(user));
        this.setUserId(user.id);
        if (user.parent) {
            this.setParentId(user.parent.id);
        }
        this.setJWTToken(jwt);
        this.setLoggedInOnce();
    }

    getUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    setDesgings(desgins: DesginDataHelper[]) {
        localStorage.setItem('desgin', JSON.stringify(desgins));
    }

    getDesgins(): DesginDataHelper[] {
        return JSON.parse(localStorage.getItem('desgin'));
    }

    setUserId(userId) {
        localStorage.setItem('userId', userId);
    }

    getUserID(): string {
        return localStorage.getItem('userId');
    }

    removeUser() {
        localStorage.removeItem('user');
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

    setParentId(parentId): any {
        localStorage.setItem('parentId', parentId);
    }

    getParentId(): string {
        return localStorage.getItem('parentId');
    }

    logout() {
        const username = this.getUserName();
        const password = this.getPassword();

        PushNotifications.removeAllListeners();
        this.firebase.deleteUser();
        localStorage.clear();
        this.deviceStorage.clear();
        window.caches.delete;
        this.setLoggedInOnce();
        this.setUserName(username);
        this.setPassword(password);
    }

    setLoggedInOnce() {
        localStorage.setItem('loggedInOnce', 'yes');
    }

    isLoggedInOnce(): boolean {
        return localStorage.getItem('loggedInOnce') !== null && localStorage.getItem('loggedInOnce') !== undefined;
    }

    setUserName(username: string) {
        localStorage.setItem('username', username);
    }

    getUserName(): string {
        return this.checkKeyAndReturnValue('username');
    }

    setPassword(password: string) {
        localStorage.setItem('password', password);
    }

    getPassword(): string {
        return this.checkKeyAndReturnValue('password');
    }

    checkKeyAndReturnValue(key: string) {
        if (localStorage.getItem(key) === null || localStorage.getItem(key) === undefined) {
            return '';
        } else {
            return localStorage.getItem(key);
        }
    }

    setData(value: any) {
        this.data = value;
    }

    getData(): any {
        return this.data;
    }

    setPrelimCharges(value: any) {
        //this.prelimCharges = value;
        localStorage.setItem('prelimCharges', value);
    }

    getPrelimCharges() {
        //return this.prelimCharges;
        return localStorage.getItem('prelimCharges');
    }

    setPermitCharges(value: any) {
        //this.permitCharges = value;
        localStorage.setItem('permitCharges', value);
    }

    getPermitCharges() {
        //return this.permitCharges;
        return localStorage.getItem('permtCharges');
    }

    getPushToken(): any {
        return localStorage.getItem('pushtoken');
    }

    getSourceType(): any {
        return this.getUser().source;
    }
}
