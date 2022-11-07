import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { FIELD_REQUIRED, INVALID_EMAIL_MESSAGE } from 'src/app/models/constants';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ErrorModel } from 'src/app/models/error.model';
import { LoginModel } from 'src/app/models/login.model';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.page.html',
    styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
    userregistrationForm: FormGroup;
    company_name = "Invalid Company Name";
    fieldRequired = FIELD_REQUIRED;
    // emailError = INVALID_EMAIL_MESSAGE;
    license_no = "Invalid license Number";
    company_address: any;
    divHeight: number;
    public isShowKeyboard: boolean = false;
    capturedImage: any = '';
    display: boolean = false;
    user: LoginModel;
    userID: string;

    public GoogleAutocomplete: google.maps.places.AutocompleteService;
    public autocompleteItems: any[];
    public map: any;
    public autoCompleteOff: boolean = false;
    public isSelectSearchResult: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private utils: UtilitiesService,
        private apiService: ApiService,
        private router: Router,
        private iab: InAppBrowser,
        private storage: StorageService,
        private storageService: StorageService,
        private navController: NavController,
        private mixpanelService: MixpanelService,
        private network: NetworkDetectService,
        private menu: MenuController,
        private db: AngularFireDatabase,
        private changedetectorref: ChangeDetectorRef,
        private zone: NgZone,

    ) {
        const NAME = /^[a-zA-Z]*$/;
        const NUMBER = /[1-9]/g;

        this.userregistrationForm = this.formBuilder.group({
            company_name: new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern(NAME)]),
            license_no: new FormControl("", [Validators.required, Validators.minLength(1), Validators.pattern(NUMBER)]),
            company_address: new FormControl("", [Validators.required]),
        });
    }

    ngOnInit() {
        this.userID = this.storage.getUserID();
        console.log("this is user ID", this.userID)
    }

    getErrorMessage(control: AbstractControl) {

        var company_name = this.userregistrationForm.get('company_name');
        var license_no = this.userregistrationForm.get('license_no');
        var company_address = this.userregistrationForm.get('company_address');
        if (control.hasError("required")) {
            return "You must enter a value";
        }
        if (control == company_name) {
            return company_name.hasError("pattern")
                ? "First name should be of min. 1 characters and contain only alphabets."
                : "";
        } else if (control == license_no) {
            return license_no.hasError("pattern")
                ? "Please enter a valid license number."
                : "";
        } else if (control == company_address) {
            return company_address.hasError("pattern")
                ? "Please enter a valid address."
                : "";
        }
    }

    async openPhotoGalleryToSelectPic(event) {
        event.preventDefault();
        this.isShowKeyboard = false;
        this.changedetectorref.detectChanges();
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Base64,
            source: CameraSource.Photos
        });

        this.capturedImage = "data:image/jpeg;base64," + image.base64String;
        console.log("This is captured Image", this.capturedImage)
    }


    registerUser() {
        console.log("hi i register")
        console.log(this.userID)
        if (this.userregistrationForm.status == 'VALID') {
            // if (this.isTermsSelect) {
            var blob: any = '';

            if (this.capturedImage) {
                blob = this.utils.getBlobFromImageData(this.capturedImage);
            }
            this.utils.showLoading("Saving").then(() => {
                var postData = {
                    usertype: "company",
                    company: this.userregistrationForm.get('company_name').value,
                    registrationnumber: this.userregistrationForm.get('license_no').value,
                    ispaymentmodeprepay: "true",
                    isonboardingcompleted: false,
                    companyaddress: this.userregistrationForm.get('company_address').value,
                }
                console.log("this is post data", postData)
                this.apiService.userRegister(this.userID, postData).subscribe((res: any) => {
                    this.user = res;
                    console.log("this is user main", this.user);
                    let sourceType = res.source;

                    if (this.capturedImage) {
                        this.apiService.uploadLogo(blob, this.capturedImage).subscribe((res: any) => {
                            this.user = res;
                            console.log("this is user sub main", this.user)
                            this.storageService.setJWTToken(this.user.jwt);
                        })
                    }
                    this.apiService.userRegister(this.userID, { isonboardingcompleted: true }).subscribe((res: any) => {
                        localStorage.setItem('user', JSON.stringify(res));
                    });
                    this.utils.hideLoading().then((response) => {
                        this.apiService.getUserAccessRights(this.userID).subscribe((response: any) => {
                            localStorage.setItem('userAccessRights', JSON.stringify(response));
                            // get access right permission data
                            console.log('response', response);

                            setTimeout(() => {
                                if (sourceType == 'android' || sourceType == 'iphone') {
                                    this.navController.navigateRoot(['home/survey']);
                                } else if (sourceType == 'web') {
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
                                }
                            }, 500);
                        }, (error) => {
                            this.navController.navigateRoot(['/dashboard']);
                        });
                        // this.utils.showSnackBar('Details has been successfully added! Please login to get started');             
                    });
                },
                    responseError => {
                        this.utils.hideLoading().then(() => {
                            const error: ErrorModel = responseError.error;
                            this.utils.errorSnackBar(error.message[0].messages[0].message);
                        });
                    })
            })
        } else {
            this.display = true;
            // this.userregistrationForm.markAllAsTouched();
            this.userregistrationForm.get('firstname').markAsDirty();
            this.userregistrationForm.get('lastname').markAsDirty();
            this.userregistrationForm.get('email').markAsDirty();
            this.userregistrationForm.get('phonenumber').markAsDirty();
            this.userregistrationForm.get('aggrement').markAsDirty();
        }
    }

    /* FOR SEARCH SHIPPING ADDRESS */
    updateSearchResults(event) {
        //this.autoCompleteOff = true;
        const input = event.detail.value;

        if (input === '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({
            input, componentRestrictions: {
                country: 'us'
            }
        }, (predictions, status) => {
            this.autocompleteItems = [];
            this.zone.run(() => {
                predictions.forEach((prediction) => {
                    this.autocompleteItems.push(prediction);
                });
            });
        });

        console.log('this.autocompleteItems', this.autocompleteItems);

    }

    onCancel() {
        this.autocompleteItems = [];
    }

    forAutoComplete(e) {
        this.autoCompleteOff = true;
        this.isSelectSearchResult = false;
    }

}
