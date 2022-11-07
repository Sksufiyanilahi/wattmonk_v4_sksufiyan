import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from 'src/app/models/constants';
import { ErrorModel } from 'src/app/models/error.model';
import { LoginModel } from 'src/app/models/login.model';
import { ApiService } from 'src/app/services/api/api.service';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { COMETCHAT_CONSTANTS, FIREBASE_DB_CONSTANTS, MAILFORMAT, MOBILEPATTERN, ROLES } from 'src/app/services/constants';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

export interface Country {
    country: string;
    calling_code: string;
}

@Component({
    selector: 'app-user-registration',
    templateUrl: './user-registration.page.html',
    styleUrls: ['./user-registration.page.scss'],
})
export class UserRegistrationPage implements OnInit {

    userregistrationForm: FormGroup;
    user: LoginModel;
    isTermsSelect: boolean = false;

    firstNameError = "Invalid First Name";
    fieldRequired = FIELD_REQUIRED;
    emailError = INVALID_EMAIL_MESSAGE;
    lastNameError = "Invalid Last Name";
    netSwitch: any;
    //countries:Country[]=(countriesjson as any).default
    countries: Country[];
    filteredCountries: Observable<Country[]>;
    selectedcountry: any;
    display: boolean = false;
    siab: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private utils: UtilitiesService,
        private apiService: ApiService,
        private router: Router,
        private iab: InAppBrowser,
        private storageService: StorageService,
        private navController: NavController,
        private mixpanelService: MixpanelService,
        private network: NetworkDetectService,
        private menu: MenuController,
        private db: AngularFireDatabase
    ) {
        const NAME = /^[a-zA-Z]*$/;

        //const EMAILPATTERN = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,8})$/;
        this.userregistrationForm = this.formBuilder.group({
            email: new FormControl("", [Validators.required, Validators.pattern(MAILFORMAT)]),
            firstname: new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern(NAME)]),
            lastname: new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern(NAME)]),
            country: new FormControl("", [Validators.required]),
            password: new FormControl(this.utils.randomPass()),
            username: new FormControl(null),
            role: new FormControl(ROLES.SuperAdmin),
            aggrement: new FormControl(null, Validators.required),
            phonenumber: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern(MOBILEPATTERN)])
        });
    }


    ngOnInit() {
        this.menu.enable(false)
        this.fetchCountry();

    }

    ngOnDestroy() {
        this.menu.enable(true)
    }

    fetchCountry() {

        this.http.get("assets/country/country.json").subscribe((res: any) => {

            this.countries = res;
            this.country();
            this.selectedcountry = this.countries.find(c => c.country == '');

            this.userregistrationForm.get('country').setValue(this.selectedcountry.country);
            this.setSelectedCountry(this.selectedcountry);
        })
    }

    displayFn(country: Country): string {
        return country && country.country ? country.country : "";
    }

    private _filter(name: string): Country[] {
        const filterValue = name.toLowerCase();

        return this.countries.filter(
            country => country.country.toLowerCase().indexOf(filterValue) != -1
        );
    }

    setSelectedCountry(item: Country) {

        this.selectedcountry = item;

    }

    country() {
        this.filteredCountries = this.userregistrationForm.get('country').valueChanges.pipe(
            startWith(""),
            map(value => (typeof value === "string" ? value : value.name)),
            map(name => (name ? this._filter(name) : this.countries.slice()))
        );
    }


    cou() {

        console.log('data');
        //this.selectedcountry = this.userregistrationForm.get('country').setValue('');
        this.fetchCountry();


    }
    registerUser() {
        if (this.userregistrationForm.status == 'VALID' && this.isTermsSelect) {
            // if (this.isTermsSelect) {
            this.utils.showLoading("Saving").then(() => {
                var postData = {
                    email: this.userregistrationForm.get('email').value.toLowerCase(),
                    password: this.userregistrationForm.get('password').value,
                    username: this.userregistrationForm.get('email').value,
                    role: this.userregistrationForm.get('role').value,
                    superadmintype : 'client'
                }
                this.apiService.registerUser(postData).subscribe((res: any) => {

                    this.user = res;
                    //
                    this.storageService.setJWTToken(this.user.jwt);
                    // this.storageService.setUser(this.user.user,this.user.jwt);
                    if (res) {
                        this.updateUser();
                    }

                    // const postData = {
                    //   firstname: this.userregistrationForm.get("firstname").value,
                    //   lastname: this.userregistrationForm.get("lastname").value,
                    //   country: this.userregistrationForm.get("country").value,
                    //   source: "android",
                    //   isdefaultpassword: true,
                    //   parent: this.user.user.id,
                    //   resetPasswordToken: this.userregistrationForm.get('password').value,
                    //   role: this.userregistrationForm.get('role').value
                    // };
                    // if(res){
                    //   this.apiservice.updateUser(this.user.user.id,postData).subscribe((response)=>{
                    //
                    //     this.router.navigate(['/login']);
                    //     this.utils.showSnackBar("User Registered Successfully");
                    //   })
                    // }
                },
                    responseError => {
                        this.utils.hideLoading().then(() => {
                            const error: ErrorModel = responseError.error;
                            this.utils.errorSnackBar(error.message[0].messages[0].message);
                        });
                        //
                    })
            })
            // }
            // else {
            //   this.utils.errorSnackBar("Please select Terms and Conditions");
            // }
        } else {
            // if (this.userregistrationForm.value.firstname == '' || this.userregistrationForm.get('firstname').hasError('pattern')) {
            //   this.utils.errorSnackBar("Please check the field first name");
            // }
            // else if (this.userregistrationForm.value.lastname == '' || this.userregistrationForm.get('lastname').hasError('pattern')) {
            //   this.utils.errorSnackBar("Please check the field last name");
            // }
            // else if (this.userregistrationForm.value.email == '' || this.userregistrationForm.get('email').hasError('pattern')) {
            //   this.utils.errorSnackBar("Please check the field email");
            // }
            // else {
            //   this.utils.errorSnackBar("Please check the field country");
            // }

            this.display = true;
            // this.userregistrationForm.markAllAsTouched();
            this.userregistrationForm.get('firstname').markAsDirty();
            this.userregistrationForm.get('lastname').markAsDirty();
            this.userregistrationForm.get('email').markAsDirty();
            this.userregistrationForm.get('phonenumber').markAsDirty();
            this.userregistrationForm.get('aggrement').markAsDirty();
        }
    }

    getErrorMessage(control: AbstractControl) {

        var firstname = this.userregistrationForm.get('firstname');
        var lastname = this.userregistrationForm.get('lastname');
        var workemail = this.userregistrationForm.get('email');
        var aggrement = this.userregistrationForm.get('aggrement');
        var phone = this.userregistrationForm.get('phonenumber');

        if (control == aggrement && control.hasError("required")) {

            return "Please read the terms of service and privacy policy and agree to proceed";
        }


        if (control.hasError("required")) {
            return "You must enter a value";
        }
        if (control == firstname) {
            return firstname.hasError("pattern")
                ? "First name should be of min. 1 characters and contain only alphabets."
                : "";
        } else if (control == lastname) {
            return lastname.hasError("pattern")
                ? "Last name should be of min. 1 characters and contain only alphabets."
                : "";
        } else if (control == workemail) {
            return workemail.hasError("pattern")
                ? "Please enter a valid email."
                : "";
        }
        else if (control == phone) {
            return phone.hasError("pattern")
                ? 'Phone number should be of min. 8 and max. 15 numbers.'
                : "";
        }
        // } else if (control == this.company) {
        //   return this.company.hasError("pattern")
        //     ? "Please enter a valid company name."
        //     : "";
        // } else if (control == this.phone) {
        //   return this.phone.hasError("pattern")
        //     ? "Please enter a valid phone number."
        //     : "";
        // }
    }

    updateUser() {

        const postData = {
            data:{
            firstname: this.userregistrationForm.get("firstname").value,
            lastname: this.userregistrationForm.get("lastname").value,
            country: this.userregistrationForm.get("country").value,
            phone: this.userregistrationForm.get('phonenumber').value,
            source: this.utils.checkPlatform(),
            isdefaultpassword: true,
            userid: this.user.user.id,
            resetPasswordToken: this.userregistrationForm.get('password').value,
            role: this.userregistrationForm.get('role').value,
            // cometchatuid: this.user.user.id + COMETCHAT_CONSTANTS.UNIQUE_CODE
        }
        };
        this.apiService.updateUser('', postData).subscribe((response: any) => {

            //this.
            // this.storageService.setUser(response);
            // this.apiService.refreshHeader();
            this.utils.hideLoading();
            const regitemRef = this.db.object(FIREBASE_DB_CONSTANTS.KEYWORD + response.id);
            regitemRef.set({ newprelims: 0, newpermits: 0 });
            this.router.navigate(['/login']);
            this.utils.showSnackBar("Congrats!! Let's get started. We have sent you default login credentials on your registered email.")
            // this.createachatuser(response.id, response.firstname + " " + response.lastname);
        },
            responseError => {
                this.utils.hideLoading().then(() => {
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                })
            })
    }

    change(event) {

        if (event.detail.checked) {
            this.siab = false;

            this.display = false;
            this.isTermsSelect = true;

        }
        else {
            this.siab = true;
            this.display = true;
            this.isTermsSelect = false;
            this.userregistrationForm.get('aggrement').setValue(null);

        }
    }

    gotoSignIn() {
        this.router.navigate(['/login'])
    }

    showTermsAggrement() {
        const browser = this.iab.create(" https://www.wattmonk.com/service-agreement", '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }

    showPrivacyPolicy() {
        const browser = this.iab.create("https://www.wattmonk.com/privacy-policy  ", '_system', 'location=yes,hardwareback=yes,hidden=yes');
    }

    privacy(event) {
        event.preventDefault();
        const browser = this.iab.create('https://www.wattmonk.com/privacy-policy');
    }

    agreement(event) {
        event.preventDefault();
        const browser = this.iab.create('https://www.wattmonk.net/service-agreement');
    }

    ionViewDidEnter() {
        this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;


        })

        this.network.networkDisconnect();
        this.network.networkConnect();
    }

    // login() {
    //   if(!this.netSwitch){
    //     this.utils.errorSnackBar('No internet connection');
    //   }else{
    //
    //     if (this.userregistrationForm.status === 'VALID') {
    //       this.utils.showLoading('Logging In').then(() => {
    //         const postData ={
    //           identifier : this.storageService.getUser().username,
    //           password : this.userregistrationForm.get('password').value
    //         }
    //         this.apiService.login(postData).subscribe(response => {
    //           this.utils.hideLoading().then(() => {
    //
    //
    //             this.mixpanelService.track("USER_LOGIN", {
    //               $id: response.user.id,
    //               $email: response.user.email,
    //               $name: response.user.firstname + response.user.lastname
    //             });

    //                // this.utils.errorSnackBar("Access Denied!! Soon we will be coming up with our platform accessibility.");
    //                this.storageService.setUserName(this.userregistrationForm.get('username').value);
    //                this.storageService.setPassword(this.userregistrationForm.get('password').value);
    //                this.storageService.setUser(response.user, response.jwt);
    //                this.apiService.refreshHeader();
    //               //  if (response.user.isdefaultpassword) {
    //               //   this.storageService.setJWTToken(response.jwt);
    //               //   this.apiService.refreshHeader();
    //               //    this.navController.navigateRoot(['change-password'])
    //               //  } else {
    //                 if(response.user.role.type==='clientsuperadmin' && (response.user.isonboardingcompleted == null || response.user.isonboardingcompleted == false)){

    //                   this.navController.navigateRoot('onboarding');
    //                   if(response.user){
    //                     this.utils.doCometUserLogin();
    //                   }
    //                 }
    //                 else{
    //                  this.navController.navigateRoot(['/dashboard'])
    //                  if(response.user){
    //                   this.utils.doCometUserLogin();
    //                 }
    //                }
    //               //}

    //           });
    //           this.apiService.emitUserNameAndRole(response.user);

    //         }, responseError => {
    //           this.utils.hideLoading().then(() => {
    //             this.apiService.resetHeaders();
    //             const error: ErrorModel = responseError.error;
    //             // this.utils.errorSnackBar(error);
    //             this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
    //           });

    //         });
    //       });

    //     } else {
    //       this.apiService.resetHeaders();
    //       this.utils.errorSnackBar("Entered email and password combination doesn't match any of our records. Please try again.");
    //     }
    //   }
    // }
    createachatuser(userid: number, name: string) {
        let apiKey = COMETCHAT_CONSTANTS.API_KEY;
        //var currenttime = new Date().getTime();
        //var uid = userid + "_" + currenttime;
        var uid = userid;
        var name = name;
        var user = new CometChat.User(uid + COMETCHAT_CONSTANTS.UNIQUE_CODE);
        user.setName(name);
        CometChat.createUser(user, apiKey).then(
            user => {
                this.utils.hideLoading();

                this.utils.showSnackBar("Congrats!! Let's get started. We have sent you default login credentials on your registered email.");
                setTimeout(() => {
                    this.router.navigate(['/login']);
                    this.utils.showSnackBar("User Registered Successfully");
                }, 3000)
            }, error => {
                this.utils.hideLoading();
                // this.utils.showSnackBar("Congrats!! Let's get started. We have sent you default login credentials on your registered email.");
                this.router.navigate(['/login']);
                this.utils.errorSnackBar("Cometchat uid has already taken");
                this.apiService.deleteTeam(userid).subscribe(res => {
                });
            }
        )
    }

    NumbersOnly(event): boolean {
        let charCode = event.which ? event.which : event.keyCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        } else {
            return true;
        }
    }

    updateTNVal(event) {
        console.log('event', event);
        let value = event.target.value;

        var newVal = "";
        value = value.replace(/\D/g, "");
        if (0 < value.length && value.length <= 3) {
            newVal = value;
        } else if (3 < value.length && value.length <= 6) {
            newVal = value.slice(0, 3) + "-" + value.slice(3);
        } else if (6 < value.length) {
            newVal = value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6, 10);
        }

        this.userregistrationForm.get('phonenumber').setValue(newVal);

    }


    filterByTN(startTn) {

        var actualphonenumber = "";
        if (startTn) {
            actualphonenumber = startTn.split("-");
        }
        if (startTn && actualphonenumber.length == 1) {

            actualphonenumber = "1" + actualphonenumber[0];
        }
        else if (startTn && actualphonenumber.length == 2) {
            actualphonenumber = "1" + actualphonenumber[0] + actualphonenumber[1];
        }
        else if (startTn && actualphonenumber.length == 3) {
            actualphonenumber = "1" + actualphonenumber[0] + actualphonenumber[1] + actualphonenumber[2];
        }

    }

}
