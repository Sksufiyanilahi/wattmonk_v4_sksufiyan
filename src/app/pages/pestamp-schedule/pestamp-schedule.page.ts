import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { IonSlides, NavController, Platform, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { AddressModel } from 'src/app/models/address.model';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { Clients } from 'src/app/models/clients.model';
import { FIELD_REQUIRED, INVALID_ADDRESS, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_PHONE_NUMBER, } from 'src/app/models/constants';

import { ErrorModel } from 'src/app/models/error.model';

import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';

import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';

import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Pestamp, PEstampCount } from 'src/app/models/pestamp.model';

import * as _ from 'lodash';
import { google } from "google-maps";
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ADDRESSFORMAT, MAILFORMAT, NAME, ROLES, NUMBERPATTERN, COMPANYFORMAT, MOBILEPATTERN } from "src/app/services/constants";
import { AwsService } from "src/app/services/aws/aws.service";

export function getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}
@Component({
    selector: 'app-pestamp-schedule',
    templateUrl: './pestamp-schedule.page.html',
    styleUrls: ['./pestamp-schedule.page.scss'],
})


export class PestampSchedulePage implements OnInit {
    firstFormGroup: FormGroup;
    //secondFormGroup:FormGroup;

    private addressSubscription: Subscription;
    fieldRequired = FIELD_REQUIRED;
    nameError = INVALID_NAME_MESSAGE;
    emailError = INVALID_EMAIL_MESSAGE;
    addressError = INVALID_ADDRESS;
    contactError = INVALID_PHONE_NUMBER;
    hardCopiesError = "Maximum value of hardcopy cannot exceed 10";
    hardCopiesPatternError = "Value of hardcopy should be a valid number";

    atticPhotosList: any = [];
    atticpostarray: any = [];
    uploadatticphotosfailedfiles: any = [];
    roofPhotosList: any = [];
    uploadroofphotosfailedfiles: any = [];
    roofphotosarray: any = [];
    permitPlanList: any = [];
    permitarray: any = [];
    uploadpermitplanfailedfiles: any = [];
    stampingTypeValue: any;
    isElectrical: boolean = false;

    stampingModeValue: any;
    isECopy: boolean = false;

    deactivateNetworkSwitch: Subscription;
    netSwitch: any;

    userdata: any;
    designId = 0;
    design: Pestamp = null;
    fieldDisabled = false;
    atticData: any;
    roofData: any;
    permitPlanData: any;
    tabsDisabled = false;
    buttonValueCheck: string;

    indexOfatticphotos = [];
    indexOfroofphotos = [];
    indexOfpermitPlanphotos = [];
    oldcommentsid: String

    isRoofFileDelete: boolean = false;
    isAtticFileDelete: boolean = false;
    isPermitPlanFileDelete: boolean = false;

    GoogleAutocomplete: google.maps.places.AutocompleteService;
    autocompleteItems: any[];

    isAtticFileUpload: boolean = false;
    isRoofFileUpload: boolean = false;
    isPermitPlanFileUpload: boolean = false;
    nonEditableField: any;
    //user: User
    // isEditMode:boolean=false;
    // formatted_address:string;

    // map: any;
    isSelectSearchResult: boolean = false;
    autoCompleteOff: boolean = false;
    geoEncoderOptions: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    hash: any;

    geocoder = new google.maps.Geocoder();
    permitdatapresent: boolean = false;
    data: any;
    permitdata: any;
    public propertytypevalue: any;
    public isClient: boolean = false;
    public isPeSuperadmin: boolean = false;
    public getCompanies: any = [];
    public filteredCompanies: Observable<Clients[]>;
    public proxyValue: any;
    public designCreatedBy;
    public designCreatedByUserParent;
    public slabname: any
    public isVAAgent: boolean = false;
    public companyrequi: boolean = false;
    isoutsourced = false;
    userGroup;
    constructor(private formBuilder: FormBuilder,
        private storage: StorageService,
        private utils: UtilitiesService,
        private zone: NgZone,
        private nativeGeocoder: NativeGeocoder,
        private apiService: ApiService,
        private route: ActivatedRoute,
        private network: NetworkDetectService,
        private navController: NavController,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private uploadaws: AwsService,
        private toastController: ToastController,
        private mixpanelService: MixpanelService) {
        this.firstFormGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.pattern(NAME)]),
            email: new FormControl('', [Validators.required, Validators.pattern(MAILFORMAT)]),
            stampingmode: new FormControl(null, [Validators.required]),
            numberofhardcopy: new FormControl(null),
            shippingaddress: new FormControl(null),
            contactnumber: new FormControl('', [
                Validators.minLength(8),
                Validators.maxLength(15),
                Validators.pattern(MOBILEPATTERN)]),
            stampingtype: new FormControl(null, [Validators.required]),
            atticphotos: new FormControl(''),
            roofphotos: new FormControl(''),
            permitplanphotos: new FormControl(''),
            comment: new FormControl(''),
            latitude: new FormControl(null),
            longitude: new FormControl(null),
            country: new FormControl(''),
            state: new FormControl(''),
            city: new FormControl(''),
            postalcode: new FormControl(null),
            mountingtype: new FormControl('', [Validators.required]),
            propertytype: new FormControl('', [Validators.required]),
            jobtype: new FormControl(''),
            sameemailconfirmed: new FormControl(null),
            tpcrequired: new FormControl(false),
            propertysubtype: new FormControl(''),
            companyname: new FormControl(''),
            outsourcedto: new FormControl(null),
            isoutsourced: new FormControl('false'),
            deliverydate: new FormControl(),
            paymentstatus: new FormControl(null),
            // })
            // this.secondFormGroup = this.formBuilder.group({

        })
        this.designId = +this.route.snapshot.paramMap.get('id');


        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];



        this.isClient = this.utils.isClient();

        if (!this.isClient) {
            this.companyrequi = true;

            console.log('com', this.companyrequi);
        }
        else {

            this.companyrequi = false;
            console.log('com', this.companyrequi);

        }


    }

    ionViewDidEnter() {
        this.deactivateNetworkSwitch = this.network.networkSwitch.subscribe(data => {
            this.netSwitch = data;

        })
        this.autocompleteItems = [];
    }

    ngOnInit() {
        this.permitdatapresent = false
        this.data = this.router.getCurrentNavigation().extras.state;
        if (this.data != undefined) {
            this.permitdata = this.data.productdetails.queryParams.designData;
            // this.tabsDisabled = this.data.productdetails.queryParams.tabsDisabled;
            // this.nonEditableField = this.data.productdetails.queryParams.nonEditableField;

            this.permitdatapresent = true


        }
        this.fieldDisabled = false;
        this.userdata = this.storage.getUser();


        if (this.designId !== 0) {
            setTimeout(() => {
                this.getDesignDetails();
            }, 1000)
        } else if (this.permitdatapresent) {
            this.getPermitData();
        }

        this.gettingClients();

        this.isClient = this.utils.isClient();
        this.isVAAgent = this.utils.isVAAgent();

        if (this.userdata.role.id == ROLES.PESuperAdmin) {
            this.isPeSuperadmin = true;
        }
    }

    // get company list
    gettingClients() {
        this.apiService.getClients().subscribe((res:any) => {
            this.getCompanies = res.data;
            console.log("this.getCompanies",this.getCompanies);
            this.filteredCompanies = this.firstFormGroup.get('companyname').valueChanges.pipe(
                startWith(""),
                map(value => (typeof value === "string" ? value : value.companyid)),
                map(companyname => (companyname ? this._filterCompanies(companyname) : this.getCompanies.slice()))
            );
        },
            error => {
                this.utils.errorSnackBar("Error");
            }
        );
    }

    private _filterCompanies(companyname: string): Clients[] {
        return this.getCompanies.filter(
            company => company.companyname.toLowerCase().indexOf(companyname) != -1
        );
    }

    onCompanyChanged(event$) {
        // this.proxyValue = event$.detail.value.companyname;
        // this.designCreatedBy = event$.detail.value.companyid;
        // this.designCreatedByUserParent = event$.detail.value.parentid;
        // if (this.designCreatedBy !== null && this.designCreatedByUserParent !== null) {
        //     this.firstFormGroup.patchValue({
        //         createdby: this.designCreatedBy,
        //         creatorparentid: this.designCreatedByUserParent,
        //     })
        // }
        this.proxyValue = event$.detail.value.companyname;
        this.designCreatedBy = event$.detail.value.companyid;
        this.designCreatedByUserParent = event$.detail.value.parentid;
        if (this.designCreatedBy !== null && this.designCreatedByUserParent !== null) {
            var designacceptancestarttime = new Date();
            designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 15);
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var d_date = tomorrow.toISOString();
            this.firstFormGroup.patchValue({
                createdby: this.designCreatedBy,
                creatorparentid: this.designCreatedByUserParent,
                status: "requestaccepted",
                outsourcedto: "232",
                isoutsourced: "true",
                designacceptancestarttime: designacceptancestarttime,
                deliverydate: d_date
            })
        }
    }

    getPermitData() {
        this.firstFormGroup.patchValue({
            name: this.permitdata.name,
            email: this.permitdata.email,
            // address: this.permitdata.address,
            // phone: this.permitdata.phonenumber,
            createdby: this.permitdata.createdby.id,
            // rooftype: this.permitdata.rooftype,
            mountingtype: this.permitdata.mountingtype,
            //architecturaldesign: this.permitdata.architecturaldesign,
            //jobtype: this.permitdata.jobtype,
            //tiltofgroundmountingsystem: this.permitdata.tiltofgroundmountingsystem,

            propertytype: this.permitdata.projecttype,

        });
    }

    /* Getting Design Details */
    getDesignDetails() {

        this.utils.showLoading('Getting Design Details').then(() => {
            this.apiService.getPestampDetails(this.designId).subscribe(async (result) => {
                await this.utils.hideLoading().then(() => {
                    this.design = result;

                    this.fieldDisabled = true;
                    this.atticData = this.design.atticphotos;
                    this.roofData = this.design.roofphotos;
                    this.permitPlanData = this.design.permitplan;

                    this.firstFormGroup.patchValue({
                        name: this.design.personname,
                        email: this.design.email,
                        stampingmode: this.design.modeofstamping,
                        atticphotos: this.design.atticphotos,
                        roofphotos: this.design.roofphotos,
                        permitplanphotos: this.design.permitplan,
                        stampingtype: this.design.type,
                        numberofhardcopy: this.design.hardcopies,
                        shippingaddress: this.design.deliveryaddress,
                        contactnumber: this.design.contactnumber,
                        createdby: this.design.createdby,
                        mountingtype: this.design.mountingtype,
                        propertytype: this.design.propertytype,
                        jobtype: this.design.jobtype,
                        // architecturaldesign:this.design.architecturaldesign,
                        comment: this.design.comments == '' ? '' : this.design.comments[0].message,
                        // type: this.design.type,
                        latitude: this.design.latitude,
                        longitude: this.design.longitude,
                        country: this.design.country,
                        state: this.design.state,
                        city: this.design.city,
                        postalcode: this.design.postalcode,
                        //attachments:this.design.attachments,
                    });
                }
                )
                this.oldcommentsid = this.design.comments == '' ? '' : this.design.comments[0].id;
                this.nonEditableField = true;

            }, (error) => {
                this.utils.hideLoading();
            })
        })
    }

    /* FOR SELECT ATTIC FILES FROM DEVICE */
    atticFiles(event) {
       
        this.utils.showLoading("Processing").then(() => {
        this.isAtticFileUpload = true;
        let uploadedfiles = 0;

        for (var index = 0; index < event.addedFiles.length; index++) {
            //  this.atticPhotosList.push(event.addedFiles[index])




            const element = event.addedFiles[index];
            console.log(event.addedFiles[index]);
            element.isImage = false;
            if (element.type.includes("image")) {
                element.isImage = true;
            }
            const type = element.name.split(".");
            if (type[1] == "heic" || type[1] == "HEIC") {
                element.isImage = true;
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    fetch(event.target.result)
                        .then((res) => res.blob())
                        .then((jpgBlob: Blob) => {
                            let replacedfile;
                            if (type[1] == "HEIC") {
                                replacedfile = new File(
                                    [jpgBlob],
                                    element.name.replace("HEIC", "jpeg"),
                                    { type: "image/jpeg" }
                                );
                            } else {
                                replacedfile = new File(
                                    [jpgBlob],
                                    element.name.replace("heic", "jpeg"),
                                    { type: "image/jpeg" }
                                );
                            }

                            this.atticPhotosList.push(replacedfile);
                            this.atticPhotosList.forEach((item) => {
                                if (item.name == replacedfile.name)
                                    item["isImage"] = true
                            });
                            setTimeout(() => {
                                this.cdr.detectChanges();
                            }, 300);
                            this.cdr.detectChanges();
                        })
                        .catch(() => {
                            // see error handling section
                        });
                };
                reader.readAsDataURL(element);
            } else {
                this.atticPhotosList.push(element);
                // this.atticerror = true;


                this.cdr.detectChanges();
            }
            let date = new Date();
            this.hash = date.getTime();
            console.log(event.addedFiles[index].name);
            this.uploadaws.fileEvent(event.addedFiles[index], "pestamp/" + this.hash + "/atticphotos").then((res) => {
                console.log('att', element);
                if (res.url) {
                    let postData = {
                       
                        name: element.name,
                        ext: "." + element.name.split(".").reverse()[0],
                        mime: element.type,
                        hash: res.timestamp,
                        size: element.size,
                        path: "pestamp/" + this.hash + "/atticphotos",
                        provider: "aws-s3",
                        url: res.url,
                        field: "atticphotos",
                        order: index + 1,
                        ref: "pestamps",
                        refid: null,
                        height: res.height,
                        width: res.width,
                   
                    };
                    this.atticpostarray.push(postData);
                    console.log('data', this.atticpostarray);

                    uploadedfiles = uploadedfiles + 1;
                    if (uploadedfiles == event.addedFiles.length) {
                        this.utils.hideLoading();
                        this.cdr.detectChanges();
                    }
                } else {
                    this.uploadatticphotosfailedfiles.push(
                        event.addedFiles[index].name
                    );
                    this.atticPhotosList.splice(this.atticPhotosList.indexOf(event.addedFiles[index]), 1);
                    // that.attachmentpostarray.splice(index, 1);
                    // console.log(this.attachmentpostarray);
                    if (this.atticpostarray.length === this.atticPhotosList.length) {
                        this.utils.hideLoading();
                        this.cdr.detectChanges();
                    }
                    if (this.atticPhotosList.length == 0) {
                        this.isAtticFileUpload = false;
                    }
                    this.cdr.detectChanges();
                }
            });


            //this.getFiletype(event.addedFiles[index]);
            // this.prelimFiles.push(event.addedFiles[i])

        }


    });
        //this.architecturalFileUpload= true;
    }

    /* FOR UPLOAD ATTIC PHOTOS OR FILES */
    uploadAtticFiles(response: any, fileObj: File, index: number) {


        if (!this.isAtticFileUpload) {
            this.uploadRoofFiles(response, this.roofPhotosList[0], 0);
        }
        else {


            // this.atticpostarray.forEach((element) => {
            //     element.refid = response.id;
            // });
            // console.log('data', this.atticpostarray);
            var postData = {
               data: this.atticpostarray
            }
            console.log("postData",postData)
            this.utils.showLoading("Uploading attic file").then(() => {
                this.apiService.uploadFile(postData).subscribe(res => {

                    this.utils.hideLoading();
                    this.uploadRoofFiles(response, this.roofPhotosList[0], 0)

                    // else if(!this.isRoofFileUpload || (!this.isRoofFileUpload && !this.isPermitPlanFileUpload))
                    // {

                    // }

                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                })

            })
        }
    }


    /* FOR SELECT ROOF FILES OR PHOTOS FROM DEVICE */
    roofFiles(event) {
        this.utils.showLoading("Processing").then(() => {
        let uploadedfiles = 0;

        this.isRoofFileUpload = true;
        for (var index = 0; index < event.addedFiles.length; index++) {
            // this.roofPhotosList.push(event.addedFiles[i])
            const element = event.addedFiles[index];
            element.isImage = false;
            if (element.type.includes("image")) {
                element.isImage = true;
            }
            const type = element.name.split(".");
            if (type[1] == "heic" || type[1] == "HEIC") {
                element.isImage = true;
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    fetch(event.target.result)
                        .then((res) => res.blob())
                        .then((jpgBlob: Blob) => {
                            let replacedfile;
                            if (type[1] == "HEIC") {
                                replacedfile = new File(
                                    [jpgBlob],
                                    element.name.replace("HEIC", "jpeg"),
                                    { type: "image/jpeg" }
                                );
                            } else {
                                replacedfile = new File(
                                    [jpgBlob],
                                    element.name.replace("heic", "jpeg"),
                                    { type: "image/jpeg" }
                                );
                            }

                            this.roofPhotosList.push(replacedfile);
                            this.roofPhotosList.forEach((item) => {
                                if (item.name == replacedfile.name)
                                    item["isImage"] = true
                            });
                            setTimeout(() => {
                                this.cdr.detectChanges();
                            }, 300);
                            this.cdr.detectChanges();
                        })
                        .catch(() => {
                            // see error handling section
                        });
                };
                reader.readAsDataURL(element);
            } else {
                this.roofPhotosList.push(element);
                this.cdr.detectChanges();
            }
            let date = new Date();
            this.hash = date.getTime();
            this.uploadaws.fileEvent(event.addedFiles[index], "pestamp/" + this.hash.toString() + "/roofphotos")
                .then((res) => {
                    if (res.url) {
                        let postData = {
                          
                            name: element.name,
                            ext: "." + element.name.split(".").reverse()[0],
                            mime: element.type,
                            hash: res.timestamp,
                            size: element.size,
                            path: "pestamp/" + this.hash.toString() + "/roofphotos",
                            provider: "aws-s3",
                            url: res.url,
                            field: "roofphotos",
                            order: index + 1,
                            ref: "pestamps",
                            refid: null,
                            height: res.height,
                            width: res.width,
                      
                        };
                        this.roofphotosarray.push(postData);
                        uploadedfiles = uploadedfiles + 1;
                        if (uploadedfiles == event.addedFiles.length) {
                            this.utils.hideLoading();
                            this.cdr.detectChanges();
                        }
                    } else {
                        this.uploadroofphotosfailedfiles.push(event.addedFiles[index].name);
                        this.roofPhotosList.splice(this.roofPhotosList.indexOf(event.addedFiles[index]), 1);
                        // that.attachmentpostarray.splice(index, 1);
                        // console.log(this.attachmentpostarray);
                        if (this.roofphotosarray.length === this.roofPhotosList.length) {
                            // this.isLoading = false;
                             this.utils.hideLoading();
                            this.cdr.detectChanges();
                        }
                        if (this.roofPhotosList.length == 0) {
                            this.isRoofFileUpload = false;
                        }
                        this.cdr.detectChanges();
                    }
                });
        }
        //this.architecturalFileUpload= true;
    });
    }

    /* FOR UPLOAD ROOF PHOTOS OR FILES */
    uploadRoofFiles(response: any, fileObj: File, index: number) {

        if (!this.isRoofFileUpload) {
            this.uploadPermitPlanFiles(response, this.permitPlanList[0], 0);

        }
        else {

            // this.roofphotosarray.forEach((element) => {
            //     element.refid = response.id;
            // });
            var postData = {
                data: this.roofphotosarray
             }

            this.utils.showLoading("Uploading roof file").then(() => {
                this.apiService.uploadFile(postData).subscribe(res => {

                    this.utils.hideLoading();

                    this.uploadPermitPlanFiles(response, this.permitPlanList[0], 0);

                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                })
            })
        }
    }

    /* FOR SELECT PHOTOS OR FILES FOR PERMIT PLAN FROM DEVICE */
    permitPlanFiles(event) {
        this.utils.showLoading("Processing").then(() => {
        let uploadedfiles = 0;

        this.isPermitPlanFileUpload = true;
        for (var index = 0; index < event.addedFiles.length; index++) {
            //this.permitPlanList.push(event.addedFiles[index])
            const element = event.addedFiles[index];
            element.isImage = false;
            if (element.type.includes("image")) {
                element.isImage = true;
            }
            this.permitPlanList.push(element);
            //this.permiterror = true;
            let date = new Date();
            this.hash = date.getTime();
            this.uploadaws.fileEvent(event.addedFiles[index], "pestamp/" + this.hash.toString() + "/permitfile").then((res) => {
                if (res.url) {


                    let postData = {
                       
                        name: element.name,
                        ext: "." + element.name.split(".").reverse()[0],
                        mime: element.type,
                        hash: res.timestamp,
                        size: element.size,
                        path: "pestamp/" + this.hash.toString() + "/permitfile",
                        provider: "aws-s3",
                        url: res.url,
                        field: "permitplan",
                        order: index + 1,
                        ref: "pestamps",
                        refid: null,
                        height: res.height,
                        width: res.width,
                        
                    };
                    this.permitarray.push(postData) ;
                    uploadedfiles = uploadedfiles + 1;
                    if (uploadedfiles == event.addedFiles.length) {
                        //this.isLoading = false;
                        this.utils.hideLoading();
                        this.cdr.detectChanges();
                    }
                } else {
                    this.uploadpermitplanfailedfiles.push(event.addedFiles[index].name);
                    this.permitPlanList.splice(this.permitPlanList.indexOf(event.addedFiles[index]), 1);
                    // that.attachmentpostarray.splice(index, 1);
                    // console.log(this.attachmentpostarray);
                    if (this.permitarray.length === this.permitPlanList.length) {
                        //this.isLoading = false;
                        this.utils.hideLoading();
                        this.cdr.detectChanges();
                    }
                    if (this.permitPlanList.length == 0) {
                        this.isPermitPlanFileUpload = false;
                    }
                    this.cdr.detectChanges();
                }
            });

        }
        //this.architecturalFileUpload= true;
    });
    }

    /* FOR UPLOAD PERMIT PLAN PHOTOS OR FILES */
    uploadPermitPlanFiles(response: any, fileObj: File, index: number) {

        if (!this.isPermitPlanFileUpload) {

            this.router.navigate(['/pestamp-home/pestamp-design'])
            this.utils.showSnackBar('Pe Stamp have been updated');
            this.utils.setPeStampRefresh(true);

        } else {


            // this.permitarray.forEach((element) => {
            //     element.refid = response.id;
            // });
            //  }
            //}
            // this.utils.showLoading("Permit Plan Uploading").then(() => {
                var postData = {
                    data: this.permitarray
                 }
          
                this.utils.showLoading("Uploading permit plan file").then(() => {
                this.apiService.uploadFile(postData).subscribe(res => {

                    this.utils.hideLoading();
                    if (this.buttonValueCheck == 'save') {
                        this.router.navigate(['/pestamp-home/pestamp-design'])
                        if (this.designId == 0) {
                            this.utils.showSnackBar('Pe Stamp have been Created');
                        } else {
                            this.utils.showSnackBar('Pe Stamp have been updated');
                        }
                        // this.utils.showSnackBar('Design have been saved');
                        this.utils.setPeStampRefresh(true);
                    } else {
                        console.log('this.buttonValueCheck', this.buttonValueCheck);

                        let objToSend: NavigationExtras = {
                            queryParams: {
                                designData: response,
                                value: 'assign'
                            },
                            skipLocationChange: false,
                            fragment: 'top'
                        };


                        this.router.navigate(['/pestamp-payment-modal'], {
                            state: { productdetails: objToSend }
                        });
                    }

                }, responseError => {
                    this.utils.hideLoading();
                    const error: ErrorModel = responseError.error;
                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                })
            })
        }
    }

    /* FOR REMOVE SELECTED PHOTOS OR FILES */
    removeArc(event, i, value) {

        if (value == 'attic') {
            this.atticPhotosList.splice(i, 1);




            let path =
                this.atticpostarray[i].path +
                "/" +
                event.name.split(".")[0] +
                "_" +
                this.atticpostarray[i].hash +
                "." +
                event.name.split(".")[1];
            // console.log(path);
            //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
            this.uploadaws.deleteAwsFile(path).then((res) => {
                this.atticPhotosList.splice(this.atticPhotosList.indexOf(event), 1);
                this.atticpostarray.splice(this.atticPhotosList.indexOf(event), 1);
                this.cdr.detectChanges();
                if (this.atticPhotosList.length == 0) {
                    this.isAtticFileUpload = false;
                }
            });
        }
        else if (value == 'roof') {
            this.roofPhotosList.splice(i, 1);
            let path =
                this.roofphotosarray[i].path +
                "/" +
                event.name.split(".")[0] +
                "_" +
                this.roofphotosarray[i].hash +
                "." +
                event.name.split(".")[1];
            // console.log(path);
            //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
            this.uploadaws.deleteAwsFile(path).then((res) => {
                this.roofPhotosList.splice(this.roofPhotosList.indexOf(event), 1);
                this.roofphotosarray.splice(this.roofPhotosList.indexOf(event), 1);
                this.cdr.detectChanges();
                if (this.roofPhotosList.length == 0) {
                    this.isRoofFileUpload = false;
                }
            });
        }
        else {
            this.permitPlanList.splice(i, 1);
            let path =
                this.permitarray[i].path +
                "/" +
                event.name.split(".")[0] +
                "_" +
                this.permitarray[i].hash +
                "." +
                event.name.split(".")[1];
            // console.log(path);
            //   let data = path + "/" + file.name.split(".")[0] + "_" + file.hash + "." + file.name.split(".")[1]
            this.uploadaws.deleteAwsFile(path).then((res) => {
                this.permitPlanList.splice(this.permitPlanList.indexOf(event), 1);
                this.permitarray.splice(this.permitPlanList.indexOf(event), 1);
                this.cdr.detectChanges();
                if (this.permitPlanList.length == 0) {
                    this.isPermitPlanFileUpload = false;
                }
            });
        }
    }

    /* FOR TYPE OF STAMPING RADIO BUTTONS */
    stampingTypeOption(e) {

        this.stampingTypeValue = e.target.value;
        const attic = this.firstFormGroup.get('atticphotos');
        const roof = this.firstFormGroup.get('roofphotos');
        const permitplan = this.firstFormGroup.get('permitplanphotos');
        const job = this.firstFormGroup.get('jobtype');
        if (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both') {
            attic.setValidators([Validators.required]);
            roof.setValidators([Validators.required]);
            permitplan.setValidators([Validators.required]);
            job.clearValidators();
            job.reset();
        }
        else if (this.stampingTypeValue == 'electrical') {
            attic.clearValidators();
            attic.reset();
            roof.clearValidators();
            roof.reset();
            permitplan.setValidators([Validators.required]);
            job.setValidators([Validators.required]);

        }
        else {
            attic.clearValidators();
            attic.updateValueAndValidity();
            roof.clearValidators();
            roof.updateValueAndValidity();
            permitplan.clearValidators();
            permitplan.updateValueAndValidity();
            job.clearValidators();
            job.updateValueAndValidity();
        }
        // if(this.stampingTypeValue == 'electrical')
        // {
        //   this.isElectrical = true;
        // }
        // else{
        //   this.isElectrical = false;
        // }

    }

    // ngOnDestroy(): void {
    //   //this.subscription.unsubscribe();
    //   // if (this.designId === 0) {
    //     this.addressSubscription.unsubscribe();
    //   //}
    // }

    /* FOR MODE OF STAMPING RADIO BUTTONS*/
    stampingModeOption(e) {


        this.stampingModeValue = e.target.value;

        // if(this.stampingModeValue == 'ecopy')
        // {
        //   this.isECopy = true;
        // }
        // else{
        //   this.isECopy = false;
        // }
        //const ADDRESSFORMAT = /^[#.0-9a-zA-Z\u00C0-\u1FFF\u2800-\uFFFD &_*#/'\s,-]+$/;
        //const NUMBERPATTERN = '^[0-9]+$';
        const shipping = this.firstFormGroup.get('shippingaddress');
        const contact = this.firstFormGroup.get('contactnumber');
        const hardcopy = this.firstFormGroup.get('numberofhardcopy');



        if (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both') {
            shipping.setValidators([
                Validators.required,
                Validators.pattern(ADDRESSFORMAT)
            ]);
            // this.name.setValidators([
            //   Validators.required,
            //   Validators.min(1),
            //   Validators.pattern("^[a-zA-Z. ]{3,}$")]);
            contact.setValidators([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(15),
                Validators.pattern(MOBILEPATTERN)]);
            hardcopy.setValidators([
                Validators.required,
                Validators.min(1),
                Validators.max(10),
                //Validators.pattern("^[0-4]+$")]);
                Validators.pattern("^[0-9]+$")]);
        }
        // else if(this.stampingModeValue == 'ecopy'){

        //   contact.setValidators([
        //     Validators.required,
        //     Validators.minLength(8),
        //     Validators.maxLength(15),
        //     Validators.pattern("^[0-9]{8,15}$")]);

        //     shipping.clearValidators();
        //     shipping.reset();
        //     hardcopy.clearValidators();
        //     hardcopy.reset();
        // }
        else {
            shipping.clearValidators();
            shipping.updateValueAndValidity();
            contact.clearValidators();
            contact.updateValueAndValidity();
            hardcopy.clearValidators();
            hardcopy.updateValueAndValidity();
        }
    }

    goBack() {
        this.mixpanelService.track("PESTAMP_PAGE_CLOSE", {
        });
        this.navController.pop();

    }

    // 3rd party stamping required change event
    tpcRequired(event) {
        let checked = event.detail.checked
        if (checked) {
            this.firstFormGroup.get('tpcrequired').setValue(true)
        }
        else {
            this.firstFormGroup.get('tpcrequired').setValue(false)
        }
    }

    /* FOR SUBMIT FORM */
    submitForm(e) {
        this.buttonValueCheck = e;
        if (this.firstFormGroup.status == 'VALID' ) {
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            let contactnumber = this.firstFormGroup.get('contactnumber').value;
            console.log('contactnumber', contactnumber);

            var stampingType = this.firstFormGroup.get('stampingtype').value;

            console.log('this.firstFormGroup', this.firstFormGroup);


            var designstatus;
            var designoutsourcedto;
            var paymentstatus;
            var isoutsourced;
            var deliverydate;

            var creatorparentid;
            var createdby;
            if (this.designCreatedBy) {
                createdby = this.designCreatedBy;
                creatorparentid = this.designCreatedByUserParent;
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 2);
                designstatus = "accepted";
                designoutsourcedto = "232";
                isoutsourced = "true";
                var designacceptancestarttime = new Date();
                designacceptancestarttime.setMinutes(designacceptancestarttime.getMinutes() + 30);
                deliverydate = tomorrow.toISOString();
                console.log('create by ' + createdby + 'creatorparentid' + creatorparentid);
            } else {
                designstatus = "created";
                designoutsourcedto = null;
                isoutsourced = "false";
                deliverydate = null;
                createdby = this.userdata.id;
                creatorparentid = this.userdata.parent.id;
            }


            if (this.designId === 0) {
              if (this.permitPlanList.length == 0 && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both' || this.stampingTypeValue == 'electrical')
                  ) {
                    this.utils.errorSnackBar("Please check the field permit plan");
                  } 
                  else if (this.atticPhotosList.length == 0  && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                    this.utils.errorSnackBar("Please check the field attic photos")
                }
                else if (this.roofPhotosList.length == 0 && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                    this.utils.errorSnackBar("Please check the field roof photos");
                }
              else{
                if (e == 'save') {
                    this.mixpanelService.track("SAVEPESTAMP_PAGE", {
                    });
                    //this.utils.showLoading('Saving').then(() => {
                    var data = {
                        data :{
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: contactnumber,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: this.utils.checkPlatform(),
                        // createdbyid: createdby,
                        createdbyid: creatorparentid,
                        creatorparentid: creatorparentid,
                        // status: "created",
                        status: designstatus,
                        outsourcedto: designoutsourcedto,
                        //paymenttype: null,
                        paymentstatus: null,
                        thirdpartystamping: this.firstFormGroup.get('tpcrequired').value,
                        propertysubtype: this.firstFormGroup.get('propertysubtype').value,
                        acceptedbypeengineer: false,
                        declinedbypeengineer: false,
                        pestampcreatorname: this.userdata.firstname + this.userdata.lastname,
                        chatid: "pestamp_" + new Date().getTime(),
                        groupchatpassword: "wattmonk" + new Date().getTime(),
                        expecteddeliverydate: tomorrow.toISOString(),
                        sameemailconfirmed: null,
                        isdesigndelivered: true,
                        design: null,
                        isoutsourced: isoutsourced,
                        hashkey: "" + new Date().getTime() + "",
                        amount: 0,
                        raiserequestreason: "",
                        isonpriority: false,
                        deliverydate: deliverydate,
                        }
                    }
                    this.utils.showLoading('Saving').then(() => {
                        this.apiService.addSiteAssessment(data).subscribe(res => {

                            //this.getClientsadmins(creatorparentid,data);
                            this.utils.hideLoading();
                            if (stampingType == 'structural' || stampingType == 'both') {
                                this.uploadAtticFiles(res, this.atticPhotosList[0], 0)
                            }
                            //if(stampingType=='electrical')
                            else {
                                console.log('permitblanl');
                                this.uploadPermitPlanFiles(res, this.permitPlanList[0], 0);
                            }
                        },
                            responseError => {
                                this.utils.hideLoading();
                                const error: ErrorModel = responseError.error;
                                console.log(error)
                                if (responseError.error.status == "alreadyexist") {
                                    var message = responseError.error.message.message;
                                    this.confirmEmail(message, "save");
                                }
                                else {
                                    this.utils.errorSnackBar(error.message);
                                }
                                //
                            })
                    })
                } 
                else if (e == 'send') {
                    this.mixpanelService.track("ORDER_PESTAMP_PAGE", {
                    });
                    var postData = {
                        data :{
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: contactnumber,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: this.utils.checkPlatform(),
                        // createdbyid: createdby,
                        createdbyid: creatorparentid,
                        creatorparentid: creatorparentid,
                        status: designstatus,
                        outsourcedto: designoutsourcedto,
                        //paymenttype: null,
                        paymentstatus: null,
                        thirdpartystamping: this.firstFormGroup.get('tpcrequired').value,
                        propertysubtype: this.firstFormGroup.get('propertysubtype').value,
                        acceptedbypeengineer: false,
                        declinedbypeengineer: false,
                        pestampcreatorname: this.userdata.firstname + this.userdata.lastname,
                        chatid: "pestamp_" + new Date().getTime(),
                        groupchatpassword: "wattmonk" + new Date().getTime(),
                        expecteddeliverydate: tomorrow.toISOString(),
                        sameemailconfirmed: null,
                        isdesigndelivered: true,
                        design: null,
                        isoutsourced: isoutsourced,
                        hashkey: "" + new Date().getTime() + "",
                        amount: 0,
                        raiserequestreason: "",
                        isonpriority: false,
                        deliverydate: deliverydate,
                        }
                    }
                    this.apiService.addSiteAssessment(postData).subscribe((res: any) => {
                        //this.getClientsadmins(creatorparentid,postData);
                        if (stampingType == 'structural' || stampingType == 'both') {
                            this.uploadAtticFiles(res, this.atticPhotosList[0], 0)
                        }
                        //if(stampingType=='electrical')
                        else {
                            this.uploadPermitPlanFiles(res, this.permitPlanList[0], 0);
                        }
                        //this.router.navigate(['pestamp-payment-modal',{isConfirmed: false, isLater: false, ispestamp: true, pestampid: res.id}]);
                        //       let objToSend: NavigationExtras = {
                        //         queryParams: {
                        //         designData:res,
                        //         value:'assign'
                        //         },
                        //         skipLocationChange: false,
                        //         fragment: 'top'
                        //     };


                        // this.router.navigate(['/pestamp-payment-modal'], {
                        //   state: { productdetails: objToSend }
                        // });
                    },
                        responseError => {
                            this.utils.hideLoading();
                            const error: ErrorModel = responseError.error;
                            console.log(error)
                            if (responseError.error.status == "alreadyexist") {
                                var message = responseError.error.message.message;
                                this.confirmEmail(message, "send");
                            }
                            else {
                                this.utils.errorSnackBar(error.message);
                            }
                            //
                        })
                }


            }
            }
            else {

                if (this.permitPlanList.length == 0 && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both' || this.stampingTypeValue == 'electrical')
                ) {
                  this.utils.errorSnackBar("Please check the field permit plan");
                }
                else if (this.atticPhotosList.length == 0  && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                    this.utils.errorSnackBar("Please check the field attic photos")
                }
                else if (this.roofPhotosList.length == 0 && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                    this.utils.errorSnackBar("Please check the field roof photos");
                } 
            else{
                if (e == 'save') {
                    var data1 = {
                        data :{
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: contactnumber,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: this.utils.checkPlatform(),
                        // createdbyid: createdby,
                        createdbyid: creatorparentid,
                        creatorparentid: creatorparentid,
                        status: designstatus,
                        // outsourcedto: null,
                        outsourcedto: designoutsourcedto,
                        //paymenttype: null,
                        paymentstatus: null,
                        oldcommentid: this.oldcommentsid,
                        propertysubtype: this.firstFormGroup.get('propertysubtype').value,
                        acceptedbypeengineer: false,
                        declinedbypeengineer: false,
                        pestampcreatorname: this.userdata.firstname + this.userdata.lastname,
                        chatid: "pestamp_" + new Date().getTime(),
                        groupchatpassword: "wattmonk" + new Date().getTime(),
                        expecteddeliverydate: tomorrow.toISOString(),
                        sameemailconfirmed: null,
                        isdesigndelivered: true,
                        design: null,
                        isoutsourced: isoutsourced,
                        hashkey: "" + new Date().getTime() + "",
                        amount: 0,
                        raiserequestreason: "",
                        isonpriority: false,
                        deliverydate: deliverydate,
                        }
                    }
                    this.utils.showLoading('Saving').then(() => {

                        this.apiService.updatePestamps(this.designId, data1).subscribe(res => {
                            this.utils.hideLoading();
                            //this.getClientsadmins(creatorparentid,data1);
                            // if(stampingType=='structural' || stampingType == 'both')

                            //  if(this.isAtticFileUploadEdit)
                            //         {
                            this.uploadAtticFiles(res, this.atticPhotosList[0], 0)
                            // }
                            //if(stampingType=='electrical')
                            /*  if(this.isRoofFileUploadEdit)
                               {
                                 this.uploadRoofFiles(res);
                               }
                              if(this.isPermitPlanFileUploadEdit){
                                 this.uploadPermitPlanFiles(res);
                               }
                               if(!this.isAtticFileUploadEdit && !this.isRoofFileUploadEdit && !this.isPermitPlanFileUploadEdit){
                                 this.router.navigate(['/pestamp-home/pestamp-design'])
                                this.utils.showSnackBar('Pe Stamp have been updated');
                           //     // this.utils.showSnackBar('Design have been saved');
                                this.utils.setPeStampRefresh(true);
                               }*/
                            // setTimeout(()=>{
                            //   this.utils.hideLoading().then(() => {

                            //     //this.createChatGroup(response);
                            //     this.router.navigate(['/pestamp-home/pestamp-design'])
                            //     this.utils.showSnackBar('Pe Stamp have been updated');
                            //     // this.utils.showSnackBar('Design have been saved');
                            //     this.utils.setPeStampRefresh(true);
                            //     // this.navController.pop();
                            //     // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                            //     //   modal.present();
                            //     //   modal.onWillDismiss().then((dismissed) => {
                            //         // this.utils.setHomepageDesignRefresh(true);
                            //     //     this.navController.pop();
                            //     //   });
                            //     // });

                            //   });
                            // },2000)
                        },
                            responseError => {
                                this.utils.hideLoading().then(() => {
                                    const error: ErrorModel = responseError.error;
                                    this.utils.errorSnackBar(error.message[0].messages[0].message);
                                });
                                //
                            })
                    })
                }
                else if (e == 'send') {
                    var postData1 = {
                        data :{
                        personname: this.firstFormGroup.get('name').value,
                        email: this.firstFormGroup.get('email').value,
                        contactnumber: contactnumber,
                        hardcopies: parseInt(this.firstFormGroup.get('numberofhardcopy').value),
                        modeofstamping: this.firstFormGroup.get('stampingmode').value,
                        type: this.firstFormGroup.get('stampingtype').value,
                        mountingtype: this.firstFormGroup.get('mountingtype').value,
                        deliveryaddress: this.firstFormGroup.get('shippingaddress').value,
                        propertytype: this.firstFormGroup.get('propertytype').value,
                        comments: this.firstFormGroup.get('comment').value,
                        latitude: this.firstFormGroup.get('latitude').value,
                        longitude: this.firstFormGroup.get('longitude').value,
                        actualdelivereddate: tomorrow.toISOString(),
                        jobtype: this.firstFormGroup.get('jobtype').value,
                        source: this.utils.checkPlatform(),
                        // createdbyid: createdby,
                        createdbyid: creatorparentid,
                        creatorparentid: creatorparentid,
                        status: designstatus,
                        outsourcedto: designoutsourcedto,
                        //paymenttype: null,
                        paymentstatus: null,
                        oldcommentid: this.oldcommentsid,
                        propertysubtype: this.firstFormGroup.get('propertysubtype').value,
                        acceptedbypeengineer: false,
                        declinedbypeengineer: false,
                        pestampcreatorname: this.userdata.firstname + this.userdata.lastname,
                        chatid: "pestamp_" + new Date().getTime(),
                        groupchatpassword: "wattmonk" + new Date().getTime(),
                        expecteddeliverydate: deliverydate,
                        sameemailconfirmed: null,
                        isdesigndelivered: true,
                        design: null,
                        isoutsourced: isoutsourced,
                        hashkey: "" + new Date().getTime() + "",
                        amount: 0,
                        raiserequestreason: "",
                        isonpriority: false,
                        deliverydate: deliverydate,
                        }
                    }
                    this.apiService.updatePestamps(this.designId, postData1).subscribe(res => {
                        //this.getClientsadmins(creatorparentid,postData1);
                        if (stampingType == 'structural' || stampingType == 'both') {
                            this.uploadAtticFiles(res, this.atticPhotosList[0], 0)
                        }
                        //if(stampingType=='electrical')
                        else {
                            this.uploadPermitPlanFiles(res, this.permitPlanList[0], 0);
                        }
                        //       let objToSend: NavigationExtras = {
                        //         queryParams: {
                        //         designData:res,
                        //         value:'assign'
                        //         },
                        //         skipLocationChange: false,
                        //         fragment: 'top'
                        //     };


                        // this.router.navigate(['/pestamp-payment-modal'], {
                        //   state: { productdetails: objToSend }
                        // });
                    },
                        responseError => {
                            this.utils.hideLoading().then(() => {
                                const error: ErrorModel = responseError.error;
                                this.utils.errorSnackBar(error.message[0].messages[0].message);
                            });
                            //
                        })

                }


            }
            }
        }
        else {
            if (this.firstFormGroup.value.name == '' || this.firstFormGroup.get('name').hasError('pattern')) {
                this.utils.errorSnackBar("Please check the field name")
            }
            else if (this.firstFormGroup.value.email == '' || this.firstFormGroup.get('email').hasError('pattern')) {
                this.utils.errorSnackBar("Please check the field email");
            }
            else if (this.firstFormGroup.value.stampingmode == null) {
                this.utils.errorSnackBar("Please select mode of stamping");
            }
            else if ((this.firstFormGroup.value.numberofhardcopy == null || this.firstFormGroup.value.numberofhardcopy == '') && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field no of hardcopies")

            }
            else if ((this.firstFormGroup.value.shippingaddress == null || this.firstFormGroup.value.shippingaddress == '' || this.firstFormGroup.get('shippingaddress').hasError('pattern')) && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field address");
            }
            else if ((this.firstFormGroup.value.contactnumber == null || this.firstFormGroup.get('contactnumber').hasError('pattern')) && (this.stampingModeValue == 'hardcopy' || this.stampingModeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field contact number")
            }
            else if (this.firstFormGroup.value.propertytype == '') {
                this.utils.errorSnackBar("Please select property type");
            }
            else if (this.firstFormGroup.value.mountingtype == '') {
                this.utils.errorSnackBar("Please select mounting type");
            }
            else if (this.firstFormGroup.value.jobtype == '') {
                this.utils.errorSnackBar("Please select job type");
            }

            else if (this.atticPhotosList.length == 0 && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field attic photos")
            }
            else if (this.roofPhotosList.length == 0 && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both')) {
                this.utils.errorSnackBar("Please check the field roof photos");
            }
            else if (this.permitPlanList.length == 0 && (this.stampingTypeValue == 'structural' || this.stampingTypeValue == 'both' || this.stampingTypeValue == 'electrical')) {
                this.utils.errorSnackBar("Please check the field permit plan");
            }
            else {
                this.utils.errorSnackBar("Please Fill all Required information");
            }
        }
    }

    //// For Address
    //   /* FOR SEARCH SHIPPING ADDRESS */
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
        },
            (predictions, status) => {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            });
        if (!this.isSelectSearchResult) {
            const address: AddressModel = {
                address: this.firstFormGroup.get("shippingaddress").value,
                lat: null,
                long: null,
                country: '',
                state: '',
                city: '',
                postalcode: null
            };
            this.utils.setAddress(address);
            this.addressValue();
        }
    }

    forAutoComplete(e) {

        this.autoCompleteOff = true;
        this.isSelectSearchResult = false;
    }

    /* FOR SELECT SEARCH SHIPPING ADDRESS*/
    selectSearchResult(item) {
        this.utils.showLoading('Loading').then(() => {
            this.isSelectSearchResult = true;
            this.geocoder.geocode({
                placeId: item.place_id
            }, (responses, status) => {

                this.getGeoEncoder(responses[0].geometry.location.lat(), responses[0].geometry.location.lng(), responses[0].formatted_address, responses[0].address_components);
            });
        });
    }

    getGeoEncoder(latitude, longitude, formattedAddress, address_components = null) {

        // // TODO remove later
        // const address: AddressModel = {
        //   address: 'Vasant Kunj, New Delhi, Delhi',
        //   lat: 28.5200491,
        //   long: 77.158687,
        //   country: 'India',
        //   state: 'Delhi',
        //   city: 'New Delhi',
        //   postalcode: '110070'
        // };
        // this.utilities.setAddress(address);
        // this.goBack();
        // return;
        console.log('address_components', address_components);

        // this.utils.showLoading('Loading').then(() => {
        this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoEncoderOptions)
            .then((result: NativeGeocoderResult[]) => {
                console.log('getGeoEncoder result', result);

                let add = '';
                if (formattedAddress === '') {
                    add = this.generateAddress(result[0]);
                } else {
                    add = formattedAddress;
                }
                this.utils.hideLoading().then(() => {
                    let administrativeArea: string = '';
                    for (let data of address_components) {
                        console.log('data', data);
                        if (data.types[0] === 'administrative_area_level_1' && data.short_name == result[0].administrativeArea) {
                            administrativeArea = data.long_name;
                        }
                    }

                    const address: AddressModel = {
                        address: add,
                        lat: latitude,
                        long: longitude,
                        country: result[0].countryName,
                        state: administrativeArea ? administrativeArea : result[0].administrativeArea,
                        city: result[0].locality,
                        postalcode: result[0].postalCode
                    };
                    this.utils.setAddress(address);
                    this.addressValue();
                    //this.goBack();
                });

            })
            .catch((error: any) => {
                this.utils.hideLoading().then(() => {
                    alert('Error getting location' + JSON.stringify(error));
                });

            });
        // });
    }

    generateAddress(addressObj) {
        const obj = [];
        let address = '';
        for (const key in addressObj) {
            obj.push(addressObj[key]);
        }
        obj.reverse();
        for (const val in obj) {
            if (obj[val].length) {
                address += obj[val] + ', ';
            }
        }
        return address.slice(0, -2);
    }

    onCancel() {

        this.autocompleteItems = [];

    }

    addressValue() {
        // }
        this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {


            // this.firstFormGroup.get('address').setValue('124/345');
            // this.firstFormGroup.get('latitude').setValue('24.553333');
            // this.firstFormGroup.get('longitude').setValue('80.5555555555');
            // this.firstFormGroup.get('country').setValue('india');
            // this.firstFormGroup.get('city').setValue('Lucknow');
            // this.firstFormGroup.get('state').setValue('UP');
            // this.firstFormGroup.get('postalcode').setValue(3232343);
            this.firstFormGroup.get('shippingaddress').setValue(address.address);
            this.firstFormGroup.get('latitude').setValue(address.lat);
            this.firstFormGroup.get('longitude').setValue(address.long);
            this.firstFormGroup.get('country').setValue(address.country);
            this.firstFormGroup.get('city').setValue(address.city);
            this.firstFormGroup.get('state').setValue(address.state);
            this.firstFormGroup.get('postalcode').setValue(address.postalcode);
        }, (error) => {
            this.firstFormGroup.get('address').setValue('');
            this.firstFormGroup.get('latitude').setValue('');
            this.firstFormGroup.get('longitude').setValue('');
            this.firstFormGroup.get('country').setValue('');
            this.firstFormGroup.get('city').setValue('');
            this.firstFormGroup.get('state').setValue('');
            this.firstFormGroup.get('postalcode').setValue('');
        });
        // this.firstFormGroup.patchValue({
        //   createdby: this.storage.getUserID()
        // });
        // this.autocompleteItems = [];
        this.autoCompleteOff = false;

        //this.getSolarMake();

    }

    onBlur() {
        setTimeout(() => {
            this.autocompleteItems = [];
        }, 100);
    }

    uploadAtticphotos(recordid: number, fileobj: File, index) {

    }

    removeattachment(file, index, value) {

        if (value == 'attic') {

            // console.log(file);
            let data = "";
            if (file.path == null) {
                data =
                    "pestamp/" +
                    this.data.pestamp.id +
                    "/" +
                    file.name.split(".")[0] +
                    "_" +
                    file.hash +
                    "." +
                    file.name.split(".")[1];
            } else {
                data =
                    file.path +
                    "/" +
                    file.name.split(".")[0] +
                    "_" +
                    file.hash +
                    "." +
                    file.name.split(".")[1];
            }
            this.uploadaws.deleteAwsFile(data).then((res) => {
                this.apiService.deleteFileAws(file.id).subscribe(
                    () => {
                        this.atticData.splice(index, 1);
                        this.data.pestamp.atticphotos.splice(index, 1);
                        this.data.pestamp.atticphotos = [...this.data.pestamp.atticphotos];
                        this.cdr.detectChanges();
                    }, responseError => {
                        this.utils.hideLoading();
                        const error: ErrorModel = responseError.error;
                        this.utils.errorSnackBar(error.message[0].messages[0].message);
                    }
                );
            });


        }
        else if (value == 'roof') {

            let data = "";
            if (file.path == null) {
                data =
                    "pestamp/" +
                    this.data.pestamp.id +
                    "/" +
                    file.name.split(".")[0] +
                    "_" +
                    file.hash +
                    "." +
                    file.name.split(".")[1];
            } else {
                data =
                    file.path +
                    "/" +
                    file.name.split(".")[0] +
                    "_" +
                    file.hash +
                    "." +
                    file.name.split(".")[1];
            }
            this.uploadaws.deleteAwsFile(data).then((res) => {
                this.apiService.deleteFileAws(file.id).subscribe(
                    () => {
                        this.roofData.splice(index, 1);
                        this.data.pestamp.roofphotos.splice(index, 1);
                        this.data.pestamp.roofphotos = [...this.data.pestamp.roofphotos];
                        this.cdr.detectChanges();
                    }, responseError => {
                        this.utils.hideLoading();
                        const error: ErrorModel = responseError.error;
                        this.utils.errorSnackBar(error.message[0].messages[0].message);
                    }
                );
            });

        }
        else {

            let data = "";
            if (file.path == null) {
                data =
                    "pestamp/" +
                    this.data.pestamp.id +
                    "/" +
                    file.name.split(".")[0] +
                    "_" +
                    file.hash +
                    "." +
                    file.name.split(".")[1];
            } else {
                data =
                    file.path +
                    "/" +
                    file.name.split(".")[0] +
                    "_" +
                    file.hash +
                    "." +
                    file.name.split(".")[1];
            }
            this.uploadaws.deleteAwsFile(data).then((res) => {
                this.apiService.deleteFileAws(file.id).subscribe(
                    () => {
                        this.permitPlanData.splice(index, 1);

                        this.data.pestamp.permitplan.splice(index, 1);
                        this.data.pestamp.permitplan = [...this.data.pestamp.permitplan];
                        this.cdr.detectChanges();
                    }, responseError => {
                        this.utils.hideLoading();
                        const error: ErrorModel = responseError.error;
                        this.utils.errorSnackBar(error.message[0].messages[0].message);
                    }
                );
            });
        }
    }

    deleteAtticFile(index) {
        for (var i = 0; i < index.length; i++) {
            var id = index[i];
            this.utils.showLoading("Deleting Attic File").then(() => {
                this.apiService.deletePestamp(id).subscribe(res => {
                    this.utils.hideLoading().then(() => {

                        this.indexOfatticphotos = [];
                    });
                })
            });
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            }
        }
        //this.utils.setPermitDesignDetailsRefresh(true);
    }

    deleteRoofFile(index) {

        for (var i = 0; i < index.length; i++) {
            var id = index[i];

            this.utils.showLoading("Deleting Roof File").then(() => {
                this.apiService.deletePestamp(id).subscribe(res => {
                    this.utils.hideLoading().then(() => {

                        this.indexOfroofphotos = [];
                    });
                })
            });
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            }
        }
        //this.utils.setPermitDesignDetailsRefresh(true);
    }

    deletePermitPlan(index) {

        for (var i = 0; i < index.length; i++) {
            var id = index[i];

            this.utils.showLoading("Deleting Permit Plan").then(() => {
                this.apiService.deletePestamp(id).subscribe(res => {
                    this.utils.hideLoading().then(() => {

                        this.indexOfpermitPlanphotos = [];
                    });
                })
            });
            (error) => {
                this.utils.hideLoading().then(() => {
                    this.utils.errorSnackBar('some Error Occured');
                });
            }
        }
        //this.utils.setPermitDesignDetailsRefresh(true);
    }

    createChatGroup(design) {
        var GUID = 'pestamp' + "_" + new Date().getTime();

        var address = design.address;
        var groupName = design.personname;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = design.groupchatpassword;

        var group = new CometChat.Group(GUID, groupName, groupType, password);

        CometChat.createGroup(group).then(group => {
            let membersList = [
                new CometChat.GroupMember("" + design.createdby.id, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
            ];
            CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(response => {
                this.cdr.detectChanges();
            })
        })
    }

    async confirmEmail(message, value) {

        const toast = await this.toastController.create({
            header: message,
            message: 'Do you want to create again?',
            cssClass: 'my-custom-delete-class',
            buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.firstFormGroup.get('sameemailconfirmed').setValue(true);
                        this.submitForm(value);
                    }
                }, {
                    text: 'No',
                    handler: () => {

                    }
                }
            ]
        });
        toast.present();
    }

    PropertyTypeOption(e) {
        this.propertytypevalue = e.target.value;
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

        this.firstFormGroup.get('contactnumber').setValue(newVal);

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



   
    getClientsadmins(id,datvar): void {
       
    
        this.apiService.getUserGroup(id, this.isoutsourced).subscribe(
          (response) => {
            this.userGroup = response;
            console.log('userGroup',this.userGroup);
            this.createNewDesignChatGroup(datvar);
          },
          (error) => {
            this.createNewDesignChatGroup(datvar);
            
          }
        );
      }


      createNewDesignChatGroup(design) {
        var GUID = 'pestamp' + "_" + new Date().getTime();

        //var address = design.address.substring(0, 60);
      //  var groupName = design.personname + "_" + address;

        var groupType = CometChat.GROUP_TYPE.PASSWORD;
        var password = design.groupchatpassword;
        


        const name = design.personname.substring(0, 60);
    const email = design.email.substring(0, 60);
    const groupName = design.type + "_" + name + "_" + email;
    console.log('groupName',groupName);
        var group = new CometChat.Group(GUID, groupName, groupType, password);
        const adminsid = [];
        CometChat.createGroup(group).then(
            (group) => {
              const membersList = [
                new CometChat.GroupMember(
                  "" + design.createdby.cometchatuid,
                  CometChat.GROUP_MEMBER_SCOPE.ADMIN
                ),
              ];
              adminsid.forEach((element) => {
                membersList.push(
                  new CometChat.GroupMember(
                    "" + element,
                    CometChat.GROUP_MEMBER_SCOPE.ADMIN
                  )
                );
              });
              CometChat.addMembersToGroup(group.getGuid(), membersList, []).then(
                () => {
                  const chatgroupusers = adminsid;
                  chatgroupusers.push(design.createdby.cometchatuid);
      
                  const inputData = {
                    title: groupName,
                    guid: GUID,
                    parentid: design.createdby.parent.id,
                    chatgroupusers: chatgroupusers,
                  };
                  this.apiService.addChatGroup(inputData).subscribe(
                    () => {
                      // do nothing.
                    },
                    (error) => {
                        this.utils.hideLoading();
                    }
                  );
                  
                  
                  this.cdr.detectChanges();
                  
                  
                },
                () => {
                    this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');
                
                }
              );
            },
            () => {
                this.utils.showSnackBar('Design request has been assigned to WattMonk successfully');
      
              this.cdr.detectChanges();
            }
          );
    }
   
}
