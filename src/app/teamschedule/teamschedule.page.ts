import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, Platform, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { FIELD_REQUIRED, INVALID_ANNUAL_UNIT, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_TILT_FOR_GROUND_MOUNT, INVALID_PHONE_NUMBER, ScheduleFormEvent, INVALID_MODULE_AND_INVERTER, INVALID_COMPANY_NAME } from '../model/constants';
import { COMETCHAT_CONSTANTS, FIREBASE_DB_CONSTANTS, ROLES } from '../constants';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { ErrorModel } from '../model/error.model';
import { NetworkdetectService } from '../networkdetect.service';
import { MixpanelService } from '../utilities/mixpanel.service';
import { DrawerState } from 'ion-bottom-drawer';
import { User } from '../model/user.model';
import { CometChat } from '@cometchat-pro/cordova-ionic-chat';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-teamschedule',
  templateUrl: './teamschedule.page.html',
  styleUrls: ['./teamschedule.page.scss'],
})
export class TeamschedulePage implements OnInit {
  teamForm: FormGroup;
  assignForm:FormGroup;
  fieldRequired = FIELD_REQUIRED;
  firstnameError = INVALID_NAME_MESSAGE;
  lastnameError = INVALID_NAME_MESSAGE;
  emailError = INVALID_EMAIL_MESSAGE;
  contactError = INVALID_PHONE_NUMBER;
  deactivateNetworkSwitch: Subscription;
  showFooter = true;
  user: any;
  data: any;
  userData: User;
  userrole: any;
  memberData: any;
  isEditMode: boolean = false;
  fieldDisabled = false;
  // userdata: any;
  memberId = 0;
  tabsDisabled = false;
  isEdit: boolean = true;
  roleValue: string;

  activedesignjobs: boolean;

  listOfAssignees: User[] = [];
  showBottomDraw: boolean = false;
  drawerState = DrawerState.Bottom;
  selectedMember: any;
  teamRoles: any;

  userSetting:any;
  isClient:boolean;
  // user:User;

  constructor(private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private apiservices: ApiService,
    private utils: UtilitiesService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private network: NetworkdetectService,
    private navController: NavController,
    private router: Router,
    private mixpanelService: MixpanelService,
    private alertController:AlertController,
    private cdr:ChangeDetectorRef,
    private db:AngularFireDatabase
  ) {
    const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    //const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
    this.teamForm = this.formBuilder.group({

      usertype: new FormControl('company'),
      firstname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      lastname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      workemail: new FormControl('', [Validators.required, Validators.pattern(MAILFORMAT)]),
      userrole: new FormControl('', [Validators.required]),
      peengineertype: new FormControl(''),
      prelimaccess:new FormControl(false),
      surveyaccess:new FormControl(false),
      permitaccess:new FormControl(false),
      pestampaccess:new FormControl(false),
      teamaccess:new FormControl(false)
      //      address:new FormControl(null),
      // //contactnumber : new FormControl(null),
      //  //lic: new FormControl(null),
      // // countrycode : new FormControl(null),
      // // //company : new FormControl(null),
      //  password: new FormControl(null),
      //        resetPasswordToken: new FormControl(null),
      //        source: new FormControl("android"),
      //        username: new FormControl(null),
      //        //value:new FormControl(null),
      //        confirmed : new FormControl(true),
      //        isdefaultpassword: new FormControl(true),
      //        provider: new FormControl("local"),
      //        parent: new FormControl(this.storageService.getUser().parent.id),
      //        company: new FormControl(this.storageService.getUser().company),//user.company,
      //        addedby: new FormControl(this.storageService.getUser().id),//.currentUserValue.user.id
    })
    this.assignForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required])
      // comment: new FormControl('')
    });
    this.userData = this.storageService.getUser();


    if(this.userData.role.type == 'wattmonkadmins' || this.userData.role.type == 'superadmin')
    {
      this.isClient = false;
    }
    else{
      this.isClient = true;
    }

    this.memberId = +this.route.snapshot.paramMap.get('id');

      // if(this.memberId !==0){
        this.memberData = this.router.getCurrentNavigation().extras.state;
        this.data = this.memberData.productdetails.queryParams.teamData;
        this.teamRoles = this.memberData.productdetails.queryParams.teamRoles;

      // }
  }

  ngOnInit() {
    if(this.memberId !==null || this.memberId !== undefined){
      if(this.data !==undefined){
        this.roleValue =this.data.role.id;

      }
    }
    this.fieldDisabled = false;
    if (this.memberId !== 0) {
      // setTimeout(() => {
        this.getStatusCount(this.data.id);
        this.isEditMode = true;
        this.getDesignDetails();
      // }, 1000)

    }
  }
  goBack() {
    this.mixpanelService.track("TEAM_PAGE_CLOSE", {
    });
    this.navController.pop();

  }


  getStatusCount(id) {
    // this.apiservices.getStatusCount(id).subscribe(
      this.apiservices.getActiveJobsCount(id).subscribe(
      response => {

        this.activedesignjobs = response;
        // this.activedesignjobs = this.statuscount.waitingforassigned + this.statuscount.waitingforacceptance + this.statuscount.requestaccepted + this.statuscount.designassigned
        //   + this.statuscount.reviewassigned + this.statuscount.reviewpassed + this.statuscount.reviewfailed;

        // ++this.activedesignjobs;
            }
      ,
      error => {
        this.utils.errorSnackBar("Error");
      })
  }


  getDesignDetails() {
    //this.utils.showLoading('Getting Design Details').then(() => {
    //this.apiservices.getTeamDetails(this.designId).subscribe(async (result) => {

    // await this.utils.hideLoading().then(() => {
      this.user = this.data;
      this.apiservices.getUserSetting(this.memberId).subscribe(res=>{
        if(res.length>0){
        this.userSetting = res[0];

      this.teamForm.patchValue({
      prelimaccess : this.userSetting.visibilityprelim,
      permitaccess : this.userSetting.visibilitypermit,
      surveyaccess : this.userSetting.visibilitysurvey,
      pestampaccess : this.userSetting.visibilitypestamp,
      teamaccess : this.userSetting.visibilityteam
      })
    }
      //this.roles = Object.(this.user)
      this.cdr.detectChanges();
    })

    this.fieldDisabled = true;
      this.teamForm.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        workemail: this.user.email,
        userrole: this.user.role.id,
        peengineertype: this.user.peengineertype,
        source: this.utils.checkPlatform()
        // createdby: this.user.designId,
        // creatorparentid: this.user.parent.designId,
        // status: "created",
        // outsourcedto: null,
      });
    //     })
    //   },(error) => {
    //     this.utils.hideLoading();
    //   })
    // })
  }

  submitForm() {




    if (this.teamForm.status === 'VALID') {
      // $ev.preventDefault();
      this.utils.showLoading("Saving").then(() => {
        if (this.memberId == 0) {
          var tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);


          let rolesel = parseInt(this.teamForm.get("userrole").value);
          var senddesignrequestpermission = false;
          if (rolesel == ROLES.Designer || rolesel == ROLES.Admin || rolesel == ROLES.Surveyor || rolesel == ROLES.Peengineer || rolesel == ROLES.Analyst) {
            senddesignrequestpermission = true;
          }
          //this.utils.showLoading('Getting Design Details').then(() => {
          this.apiservices
            .addUser(
              this.teamForm.get("workemail").value,
              this.teamForm.get("firstname").value,
              this.teamForm.get("lastname").value,
              senddesignrequestpermission,
              parseInt(this.teamForm.get("userrole").value),
              this.userData.parent.minpermitdesignaccess,
              this.teamForm.get("peengineertype").value,
              this.teamForm.get("usertype").value,
              this.teamForm.get('prelimaccess').value,
              this.teamForm.get('permitaccess').value,
              this.teamForm.get('surveyaccess').value,
              this.teamForm.get('pestampaccess').value,
              this.teamForm.get('teamaccess').value
            )
            .subscribe(
              (response: any) => {
                this.utils.hideLoading().then(() => {
                  this.createachatuser(""+response.id, response.firstname + " " + response.lastname);
                  const regitemRef = this.db.object(FIREBASE_DB_CONSTANTS.KEYWORD + response.id);
                    regitemRef.set({ newprelims: 0, newpermits: 0 });


                });
              },

              responseError => {
                this.utils.hideLoading().then(() => {
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message);
                });

              })
        }
        else {

          if((!this.isClient && this.activedesignjobs))
          {
            this.utils.hideLoading();
            this.openreviewPassed();
        }
        else if((this.isClient && this.data.role.type == 'surveyors' && this.activedesignjobs)){
          this.utils.hideLoading();
            this.openreviewPassedForClient();
        }
        else
        {
          let rolesel = parseInt(this.teamForm.get("userrole").value);
          var senddesignrequestpermission = false;
          if (rolesel == ROLES.Designer || rolesel == ROLES.Admin || rolesel == ROLES.Surveyor || rolesel == ROLES.Peengineer || rolesel == ROLES.Analyst || rolesel == ROLES.BD) {
            senddesignrequestpermission = true;
          }
          const postdata = {
            firstname: this.teamForm.get("firstname").value,
            lastname: this.teamForm.get("lastname").value,
            email: this.teamForm.get("workemail").value,
            role: parseInt(this.teamForm.get("userrole").value),
            peengineertype: this.teamForm.get("peengineertype").value,
            visibilityprelim: this.teamForm.get('prelimaccess').value,
            visibilitysurvey: this.teamForm.get('surveyaccess').value,
            visibilitypermit: this.teamForm.get('permitaccess').value,
            visibilitypestamp: this.teamForm.get('pestampaccess').value,
            visibilityteam: this.teamForm.get('teamaccess').value
          }

          this.apiservices
            .updateTeam(
              postdata, this.memberId

            )
            .subscribe(
              (response: any) => {


                this.utils.hideLoading().then(() => {
                  //this.createChatGroup(response);
                    this.router.navigate(['/teamhomepage'])

                  this.utils.showSnackBar('Team updated succesfully');
                  // this.utils.showSnackBar('Design have been saved');
                  this.utils.setteamModuleRefresh(true);
                  // this.navController.pop();
                  // this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                  //   modal.present()
                  //   modal.onWillDismiss().then((dismissed) => {
                  // this.utils.setHomepageDesignRefresh(true);
                  //     this.navController.pop();
                  //   });
                  // });

                });

              },
              responseError => {
                this.utils.hideLoading().then(() => {
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message);
                });

              })
        }
      }
      },
        responseError => {
          this.utils.hideLoading();
        })
    }
    else {
      if (this.teamForm.value.firstname == '' || this.teamForm.get('firstname').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field first name");
      }
      else if (this.teamForm.value.lastname == '' || this.teamForm.get('lastname').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field lastname");
      }
      else if (this.teamForm.value.workemail == '' || this.teamForm.get('workemail').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field email");
      }
      else {
        this.utils.errorSnackBar("Please check the field user role");
      }
    }
  }

  getassignedata(asssignedata){
    this.selectedMember = asssignedata;


  }

  async openreviewPassed(){


    // this.designId=id
    const alert = await this.alertController.create({
      cssClass: 'alertClass',
      header: 'Confirm!',
      message: 'Selected user is having active jobs in the account, either move all jobs to unassigned stage or transfer them to another user.',
      inputs: [
        // {
        //   name: 'radio1',
        //   type: 'radio',
        //   label: 'Unassign jobs',
        //   value: 'unassignedjobs',
        //   handler: () => {
        //
        //   },
        //   checked: true
        // },
        {
          name: 'radio',
          type: 'radio',
          label: 'Transfer jobs',
          value: 'transferjobs',
          handler: () => {
          },
          checked: true
        },
        ] ,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Move',
          handler: (alertData) => {

            var postData= {};
            let roleId = this.teamForm.get("userrole").value;
            // if(alertData == 'unassignedjobs')
            // {
            //   postData = {role: roleId,
            //     blocked: false }
            //   this.utils.showLoading("Unassigning Jobs").then(()=>{
            //   this.apiservices.unassignedJobs(this.data.id,postData).subscribe((res)=>{
            //
            //     this.utils.hideLoading().then(()=>{
            //       // this.utils.showSnackBar("Jobs Unassigned Successfully");

            //         let rolesel = parseInt(this.teamForm.get("userrole").value);
            //         // var senddesignrequestpermission = false;
            //         // if (rolesel == ROLES.Designer || rolesel == ROLES.Admin || rolesel == ROLES.Surveyor || rolesel == ROLES.Peengineer || rolesel == ROLES.Analyst || rolesel == ROLES.BD) {
            //         //   senddesignrequestpermission = true;
            //         // }
            //         const postdata = {
            //           firstname: this.teamForm.get("firstname").value,
            //           lastname: this.teamForm.get("lastname").value,
            //           email: this.teamForm.get("workemail").value,
            //           role: parseInt(this.teamForm.get("userrole").value),
            //           peengineertype: this.teamForm.get("peengineertype").value
            //         }

            //         this.apiservices
            //           .updateTeam(
            //             postdata, this.memberId

            //           )
            //           .subscribe(
            //             (response: any) => {


            //               this.utils.hideLoading().then(() => {
            //                 this.utils.showSnackBar('Team updated succesfully');
            //                 this.router.navigate(['/teamhomepage'])
            //                 this.utils.setteamModuleRefresh(true);

            //               });

            //             },
            //             responseError => {
            //               this.utils.hideLoading().then(() => {
            //                 const error: ErrorModel = responseError.error;
            //                 this.utils.errorSnackBar(error.message);
            //               });

            //             })
            //       // this.getStatusCount(this.data.id);
            //       // this.router.navigate(['/teamhomepage']);
            //       // this.submitForm();
            //     })
            //   },responseError => {
            //     this.utils.hideLoading().then(() => {
            //       const error: ErrorModel = responseError.error;
            //       this.utils.errorSnackBar(error.message);
            //     });

            //   })
            // })
            // }
            // else if(alertData == 'transferjobs')
            // {
              // this.apiservices.getCompanyUsers(this.data.parent.id,this.data.role.id).subscribe((res)=>{
              //
              // })

              if (this.listOfAssignees.length === 0) {
                this.utils.showLoading('Getting Users').then(() => {
                  this.apiservices.getCompanyUsers(this.data.parent.id,this.data.role.id).subscribe((assignees:any)=>{
                    this.utils.hideLoading().then(() => {
                      this.listOfAssignees = [];

                      assignees.forEach((element , i)=>{

                        if(element.id == this.memberId){
                          assignees.splice(i,1);
                        }
                       })
                      // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                      assignees.forEach(item => this.listOfAssignees.push(item));


                      this.showBottomDraw = true;
                      // this.designId = id;
                      this.utils.setBottomBarHomepage(false);
                      this.drawerState = DrawerState.Docked;
                      this.assignForm.patchValue({
                        assignedto: ''
                      });
                    });
                  }, (error) => {
                    this.utils.hideLoading().then(() => {
                      this.utils.errorSnackBar('Some error occurred. Please try again later');
                    });
                  });
                });

              } else {
                // this.designId = id;
                this.utils.setBottomBarHomepage(false);
                this.drawerState = DrawerState.Docked;
                this.assignForm.patchValue({
                  assignedto: ''
                });
              }
              // postData = {role:""}
              // this.apiservices.transferJobs(this.data.id,this.data.id,postData).subscribe((res)=>{
              //
              // })
            // }
            // if(alertData.comment!=""){
            //  postData = {
            //   status: "delivered",
            //   comments: alertData.comment ,
            //    };}
            //    else{
            //     postData = {
            //       status: "delivered",
            //        };
            //    }

              //  this.apiservices.updateDesignForm(postData, this.designId).subscribe((value) => {
              //   this.utils.hideLoading().then(()=>{
              //     ;

              //    this.utils.showSnackBar('Design request has been delivered successfully');
              //    this.utils.setHomepagePermitRefresh(true);
              //   })
              // }, (error) => {
              //   this.utils.hideLoading();
              //   ;
              // });
          }
        }
      ]
    });

    await alert.present();
    }


    async openreviewPassedForClient(){


      // this.designId=id
      const alert = await this.alertController.create({
        cssClass: 'alertClass',
        // header: 'Confirm!',
        message: 'This user has active jobs so you can not change role for this user',

        buttons: [
          {
            text: 'Close',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {

            }
          }
        ]
      });

      await alert.present();
      }

    dismissBottomSheet() {
      this.showBottomDraw = false;

      this.drawerState = DrawerState.Bottom;
      this.utils.setBottomBarHomepage(true);
      this.listOfAssignees=[];
    }

    transferJobs()
    {
        let roleId = this.teamForm.get("userrole").value;
      var postData = {role: roleId,
        blocked: false}
              this.utils.showLoading("Transfering Jobs").then(()=>{
              this.apiservices.transferJobs(this.data.id,this.selectedMember.id,postData).subscribe((res)=>{

                this.utils.hideLoading().then(()=>{
                  // this.utils.showSnackBar("Jobs Transfered Successfully");
                  // this.submitForm();
                  // let rolesel = parseInt(this.teamForm.get("userrole").value);
                  // var senddesignrequestpermission = false;
                  // if (rolesel == ROLES.Designer || rolesel == ROLES.Admin || rolesel == ROLES.Surveyor || rolesel == ROLES.Peengineer || rolesel == ROLES.Analyst || rolesel == ROLES.BD) {
                  //   senddesignrequestpermission = true;
                  // }
                  const postdata = {
                    firstname: this.teamForm.get("firstname").value,
                    lastname: this.teamForm.get("lastname").value,
                    email: this.teamForm.get("workemail").value,
                    role: parseInt(this.teamForm.get("userrole").value),
                    peengineertype: this.teamForm.get("peengineertype").value
                  }

                  this.apiservices
                    .updateTeam(
                      postdata, this.memberId

                    )
                    .subscribe(
                      (response: any) => {


                        this.utils.hideLoading().then(() => {
                          this.utils.showSnackBar('Team updated succesfully');
                          this.router.navigate(['/teamhomepage'])
                          this.utils.setteamModuleRefresh(true);

                        });

                      },
                      responseError => {
                        this.utils.hideLoading().then(() => {
                          const error: ErrorModel = responseError.error;
                          this.utils.errorSnackBar(error.message);
                        });

                      })
                // this.getStatusCount(this.data.id);
                // this.router.navigate(['/teamhomepage']);
                // this.submitForm();
              })
            },(error)=>{
              this.utils.hideLoading();
            })
          // })
                // })
              },responseError => {
                this.utils.hideLoading().then(() => {
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message);
                });

              })

    }

  roleChange(id) {

    this.roleValue = id;
    if(id == "8"){
      this.teamForm.get('prelimaccess').setValue(true);
      this.teamForm.get('permitaccess').setValue(true);
    }
    if(id == "9"){
      this.teamForm.get('surveyaccess').setValue(true);
    }
    if(id == "10"){
      this.teamForm.get('prelimaccess').setValue(true);
      this.teamForm.get('permitaccess').setValue(true);
    }
    if(id == "3"|| id == "4" || id == "5" || id == "6" || id == "7"){
      this.teamForm.get('prelimaccess').setValue(true);
      this.teamForm.get('permitaccess').setValue(true);
      this.teamForm.get('surveyaccess').setValue(true);
      this.teamForm.get('pestampaccess').setValue(true);
    }
  }

  createachatuser(userid: string, name: string) {
    let apiKey = COMETCHAT_CONSTANTS.API_KEY;
    //var currenttime = new Date().getTime();
    //var uid = userid + "_" + currenttime;
    var uid = userid;
    var name = name;
    var user = new CometChat.User(uid);
    user.setName(name);
    CometChat.createUser(user, apiKey).then(
      user => {
        this.utils.hideLoading();
        this.utils.showSnackBar('Team created successfully');
        this.utils.setteamModuleRefresh(true);
        this.router.navigate(['/teamhomepage'])

      }, error => {
        this.utils.hideLoading();
        this.utils.errorSnackBar('The cometchat uid has already been taken');

        this.utils.setteamModuleRefresh(true);
        this.router.navigate(['/teamhomepage'])

      }
    )
  }
}
