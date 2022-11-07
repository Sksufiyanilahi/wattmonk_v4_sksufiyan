import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, MenuController, NavController, Platform } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from 'src/app/models/constants';
import { ErrorModel } from 'src/app/models/error.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MAILFORMAT, ROLES } from 'src/app/services/constants';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

import { Keyboard } from '@capacitor/keyboard';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    @ViewChild('content', { static: false }) content: IonContent;
    public loginForm: FormGroup;
    public isActiveToggleTextPassword = true;

    public emailError = INVALID_EMAIL_MESSAGE;
    public fieldRequired = FIELD_REQUIRED;
    public isLoggedInOnce = false;
    public netSwitch: any;
    public buttonTitle = 'Sign in';
    public innerHeight: number = 0;
    sourcetype: string;

    constructor(
        private formBuilder: FormBuilder,
        private utils: UtilitiesService,
        private apiService: ApiService,
        private storageService: StorageService,
        private router: Router,
        private menu: MenuController,
        private network: NetworkDetectService,
        private navController: NavController,
        private mixpanelService: MixpanelService,
        private myApp: AppComponent,
        private platform: Platform,
        private cdr: ChangeDetectorRef
    ) {
        this.isLoggedInOnce = this.storageService.isLoggedInOnce();
        // setTimeout(() => {
        //     this.content.getScrollElement().then(scrollElement => {
        //         this.innerHeight = scrollElement.clientHeight;
        //         this.cdr.detectChanges();
        //     });
        // }, 2000);
    }

    ngOnInit() {
        this.menu.enable(false)
        this.loginForm = this.formBuilder.group({
            identifier: new FormControl(this.storageService.getUserName(), [Validators.required, Validators.pattern(MAILFORMAT)]),
            password: new FormControl(this.storageService.getPassword(), [Validators.required, Validators.minLength(3)])
        });

        Keyboard.setAccessoryBarVisible({ isVisible: true });
        this.sourcetype = 'web'
    }

    ionViewWillEnter() {
        this.innerHeight = window.innerHeight;
    }

    ngOnDestroy() {
        this.menu.enable(true)
    }

    ionViewDidEnter() {
        this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;
        });

        this.network.networkDisconnect();
        this.network.networkConnect();
    }

    login() {
        if (!this.netSwitch) {
            this.utils.errorSnackBar('No internet connection');
        } else {
            if (this.loginForm.status === 'VALID') {
                this.utils.showLoading('Logging In').then(() => {
                    this.apiService.login(this.loginForm.value).subscribe(response => {
                        console.log('response',response)
                        localStorage.removeItem('newpasswordrequested');
                        this.utils.hideLoading().then(() => {

                            this.mixpanelService.track("USER_LOGIN", {
                                $id: response.user.id,
                                $email: response.user.email,
                                $name: response.user.firstname + response.user.lastname
                            });

                            if (response.user.userprofile.source == 'android' || response.user.userprofile.source == 'iphone') {
                                if (response.user.role.id == ROLES.Surveyor) {
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);

                                    this.storageService.setUser(response.user, response.jwt);

                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password'])
                                    } else {
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['surveyor-overview']);
                                        if (response.user) {
                                            this.utils.doCometUserLogin();
                                        }
                                    }
                                } else {
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);
                                    this.storageService.setUser(response.user, response.jwt);
                                    this.apiService.refreshHeader();
                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password']);
                                    } else {
                                        if (response.user.role.type === 'clientsuperadmin' && (response.user.userprofile.isonboardingcompleted == null || response.user.userprofile.isonboardingcompleted == false)) {
                                            this.navController.navigateRoot('onboarding');
                                            if (response.user) {
                                                this.utils.doCometUserLogin();
                                            }
                                        } else {
                                            this.apiService.getUserAccessRights(response.user.id).subscribe((response: any) => {
                                                localStorage.setItem('userAccessRights', JSON.stringify(response));
                                                // get access right permission data

                                                setTimeout(() => {
                                                    // this.navController.navigateRoot(['home/survey']);
                                                    this.navController.navigateRoot(['/dashboard']);

                                                    if (response.user) {
                                                        this.utils.doCometUserLogin();
                                                    }
                                                }, 100);
                                            }, (error) => {
                                                this.navController.navigateRoot(['/dashboard']);
                                                if (response.user) {
                                                    this.utils.doCometUserLogin();
                                                }
                                            });
                                        }
                                    }
                                }
                            } else if (this.sourcetype == 'web') {
                            // console.log('respose', response);

                                if (response.user.role.id == ROLES.Surveyor) {
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);

                                    this.storageService.setUser(response.user, response.jwt);

                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password'])
                                    } else {
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['surveyor-overview']);
                                        if (response.user) {
                                            this.utils.doCometUserLogin();
                                        }
                                    }
                                } else if (response.user.role.id == ROLES.Designer) {
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);
                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password'])
                                    } else {
                                        this.storageService.setUser(response.user, response.jwt);
                                        this.apiService.refreshHeader();
                                        this.apiService.getUserAccessRights(response.user.id).subscribe(
                                            (response: any) => {
                                                console.log('getUserAccessRights response', response);
                                                localStorage.setItem('userAccessRights', JSON.stringify(response));
                                                // get access right permission data
                                                setTimeout(() => {
                                                    let permitAccess = this.utils.getUserAccessRights('permit');
                                                    let prelimAccess = this.utils.getUserAccessRights('prelim');

                                                    if (permitAccess?.visibility) {
                                                        this.navController.navigateRoot(['permit-design-overview']);
                                                    } else if (prelimAccess?.visibility) {
                                                        this.navController.navigateRoot(['design-overview']);
                                                    }

                                                    if (response.user) {
                                                        this.utils.doCometUserLogin();
                                                    }
                                                }, 100);
                                            }, (error) => {
                                                //this.notifyService.showError(error, "Error");
                                                this.navController.navigateRoot(['permit-design-overview']);
                                                if (response.user) {
                                                    this.utils.doCometUserLogin();
                                                }
                                            }
                                        );
                                    }
                                } else if (response.user.role.id == ROLES.Analyst) {
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);

                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password'])
                                    } else {
                                        this.storageService.setUser(response.user, response.jwt);
                                        this.apiService.refreshHeader();
                                        this.apiService.getUserAccessRights(response.user.id).subscribe(
                                            (response: any) => {
                                                console.log('getUserAccessRights response', response);
                                                localStorage.setItem('userAccessRights', JSON.stringify(response));
                                                // get access right permission data
                                                setTimeout(() => {
                                                    let permitAccess = this.utils.getUserAccessRights('permit');
                                                    let prelimAccess = this.utils.getUserAccessRights('prelim');
                                                    let surveyAccess = this.utils.getUserAccessRights('survey');

                                                    if (permitAccess?.visibility) {
                                                        this.navController.navigateRoot(['analyst-overview/permit-design']);
                                                    } else if (prelimAccess?.visibility) {
                                                        this.navController.navigateRoot(['analyst-overview/design']);
                                                    } else if (surveyAccess?.visibility) {
                                                        this.navController.navigateRoot(['analyst-overview/survey']);
                                                    }

                                                    if (response.user) {
                                                        this.utils.doCometUserLogin();
                                                    }
                                                }, 100);
                                            }, (error) => {
                                                //this.notifyService.showError(error, "Error");
                                                this.navController.navigateRoot(['analyst-overview']);
                                                if (response.user) {
                                                    this.utils.doCometUserLogin();
                                                }
                                            }
                                        );
                                    }
                                } else if (response.user.role.id == ROLES.Peengineer) {
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);

                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password'])
                                    } else {
                                        this.storageService.setUser(response.user, response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['peengineer']);
                                        if (response.user) {
                                            this.utils.doCometUserLogin();
                                        }
                                    }
                                } else if (response.user.role.id == ROLES.PESuperAdmin || response.user.role.id == ROLES.PeAdmin) {
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);

                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password'])
                                    } else {
                                        this.storageService.setUser(response.user, response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['pestamp-home']);
                                        if (response.user) {
                                            this.utils.doCometUserLogin();
                                        }
                                    }
                                } else {
                                    // console.log('else response', response);
                                    this.storageService.setUserName(this.loginForm.get('identifier').value);
                                    this.storageService.setPassword(this.loginForm.get('password').value);
                                    this.storageService.setUser(response.user, response.jwt);
                                    this.apiService.refreshHeader();
                                    if (response.user.parent.isdefaultpassword) {
                                        this.storageService.setJWTToken(response.jwt);
                                        this.apiService.refreshHeader();
                                        this.navController.navigateRoot(['change-password'])
                                    } else {
                                        if (response.user.role.type === 'clientsuperadmin' && (response.user.userprofile.
                                            isonboardingcompleted == null || response.user.userprofile.isonboardingcompleted == false)) {
                                            this.navController.navigateRoot('onboarding');
                                            if (response.user) {
                                                this.utils.doCometUserLogin();
                                            }
                                        } else {
                                            console.log("response.user.id",response.user.id);
                                            
                                            this.apiService.getUserAccessRights(response.user.id).subscribe((response: any) => {
                                                console.log("response",response)
                                                localStorage.setItem('userAccessRights', JSON.stringify(response));
                                                // get access right permission data

                                                setTimeout(() => {
                                                    let dashboardAccess = this.utils.getUserAccessRights('dashboard');
                                                    let permitAccess = this.utils.getUserAccessRights('permit');
                                                    let prelimAccess = this.utils.getUserAccessRights('prelim');
                                                    let pestampAccess = this.utils.getUserAccessRights('pestamp');
                                                    let surveyAccess = this.utils.getUserAccessRights('survey');

                                                    if (dashboardAccess?.visibility) {
                                                        this.navController.navigateRoot(['/dashboard']);
                                                    } else if (permitAccess?.visibility) {
                                                        this.navController.navigateRoot(['permit-home']);
                                                    } else if (prelimAccess?.visibility) {
                                                        this.navController.navigateRoot(['home/design']);
                                                    } else if (pestampAccess?.visibility) {
                                                        this.navController.navigateRoot(['pestamp-home']);
                                                    } else if (surveyAccess?.visibility) {
                                                        this.navController.navigateRoot(['home/survey']);
                                                    } else {
                                                        this.navController.navigateRoot(['/dashboard']);
                                                    }

                                                    if (response.user) {
                                                        this.utils.doCometUserLogin();
                                                    }
                                                }, 100);
                                            }, (error) => {
                                                this.navController.navigateRoot(['/dashboard']);
                                                if (response.user) {
                                                    this.utils.doCometUserLogin();
                                                }
                                            });
                                            if (response.user) {
                                                this.utils.doCometUserLogin();
                                            }
                                        }
                                    }
                                }
                            }
                            setTimeout(() => {
                                this.myApp.getClientRole();
                                console.log("response.user.id",response.user.id);
                                this.myApp.getUserAccessRights(response.user.id);
                                this.myApp.registerAPNS(response.user);
                                this.utils.getUnreadMessageCountForGroupsAsyc();
                            }, 1000);
                        });
                        this.apiService.emitUserNameAndRole(response.user);

                    }, responseError => {
                        this.utils.hideLoading().then(() => {
                            this.apiService.resetHeaders();
                            const error: ErrorModel = responseError.error;
                            // this.utils.errorSnackBar(error);
                            this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
                        });

                    });
                });

            } else {
                this.apiService.resetHeaders();
                // this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
                this.loginForm.get('identifier').markAsDirty();
                this.loginForm.get('password').markAsDirty();
            }
        }
    }

    public toggleTextPassword() {
        this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
    }

    getType() {
        return this.isActiveToggleTextPassword ? 'password' : 'text';
    }

    get password() {
        return this.loginForm.get('password');
    }

    changepassword() {
        this.router.navigate(['/change-password']);
    }

    gotoSignup() {
        this.router.navigate(['/user-registration']);
    }

}
