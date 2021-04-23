import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { FIELD_REQUIRED, INVALID_ANNUAL_UNIT, INVALID_EMAIL_MESSAGE, INVALID_NAME_MESSAGE, INVALID_TILT_FOR_GROUND_MOUNT, INVALID_PHONE_NUMBER, ScheduleFormEvent, INVALID_MODULE_AND_INVERTER, INVALID_COMPANY_NAME } from '../model/constants';
import { ROLES } from '../contants';
import { StorageService } from '../storage.service';
import { UtilitiesService } from '../utilities.service';
import { ErrorModel } from '../model/error.model';
import { NetworkdetectService } from '../networkdetect.service';
import { MixpanelService } from '../utilities/mixpanel.service';
@Component({
  selector: 'app-teamschedule',
  templateUrl: './teamschedule.page.html',
  styleUrls: ['./teamschedule.page.scss'],
})
export class TeamschedulePage implements OnInit {
  teamForm:FormGroup;
  fieldRequired = FIELD_REQUIRED;
  firstnameError = INVALID_NAME_MESSAGE;
  lastnameError= INVALID_NAME_MESSAGE;
  emailError = INVALID_EMAIL_MESSAGE;
  contactError = INVALID_PHONE_NUMBER;
  deactivateNetworkSwitch: Subscription;
  showFooter=true;
    user : any;
    data:any;
    userData:any;
  userrole: any;
       designData:any;
       isEditMode:boolean=false;
       fieldDisabled = false;
       userdata: any;
       designId = 0;
       currentTab = 'designData';
       tabsDisabled = false;
       isEdit : boolean = true ;
       roles:any;
      roleValue:string;

  constructor(private formBuilder:FormBuilder,
    private modalCtrl:ModalController,
    private apiservices: ApiService,
    private utils: UtilitiesService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private network:NetworkdetectService,
    private navController:NavController,
    private router:Router,
    private mixpanelService: MixpanelService,

) {    const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
  //const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
    this.teamForm = this.formBuilder.group({

      usertype : new FormControl(null),
      firstname:new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      lastname:new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      workemail:new FormControl('',[Validators.required, Validators.pattern(MAILFORMAT)]),
      userrole : new FormControl('',[Validators.required]),
      peengineertype : new FormControl('')
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
    this.designId = +this.route.snapshot.paramMap.get('id');
    console.log(this.designId)
    if(this.designId !==0){

   this.designData = this.router.getCurrentNavigation().extras.state;
   this.data = this.designData.productdetails.queryParams.designData;
    }
  }

  ngOnInit() {
    this.fieldDisabled = false;
    this.designData = this.storageService.getUser();
   // if(this.userData.role.type=='clientsuperadmin' || this.userData.role.name=='SuperAdmin' )
    // this.tabsDisabled = this.designData.productdetails.queryParams.tabsDisabled;
    // this.nonEditableField = this.designData.productdetails.queryParams.nonEditableField;
    console.log(this.designData);
    this.getRoles();
    if (this.designId !== 0) {
      setTimeout(() => {
        this.isEditMode=true;
        this.getDesignDetails();
      }, 1000)

    }
  }
    goBack() {
      this.mixpanelService.track("TEAM_PAGE_CLOSE", {
      });
      this.navController.pop();

    }

    getRoles()
    {
      let parentId = this.designData.parent.id;
      let roleId = this.designData.role.id;
      this.apiservices.getDynamicRoles(parentId,roleId).subscribe((res)=>{
        // console.log(res);
         this.roles = res;
        // console.log(this.roles);
        if(res == 0)
        {
          this.apiservices.getDefaultRoles(roleId).subscribe((response)=>{
            console.log(response);
            this.roles = response;
            console.log(this.roles)
          })
        }
      })
    }


    getDesignDetails() {
    //   console.log(this.router.getCurrentNavigation())
    //   console.log(this.router.getCurrentNavigation().extras)
    //   this.designData = this.router.getCurrentNavigation().extras.state;
    //  this.data = this.designData.productdetails.queryParams.designData;
      //this.utils.showLoading('Getting Design Details').then(() => {
       //this.apiservices.getTeamDetails(this.designId).subscribe(async (result) => {

       // await this.utils.hideLoading().then(() => {
          this.user = this.data;
          console.log(this.user);

          //this.roles = Object.(this.user)
            console.log(this.roles);
            this.fieldDisabled = true;

            this.teamForm.patchValue({
              firstname: this.user.firstname,
              lastname: this.user.lastname,
              workemail: this.user.email,
              userrole:this.user.role.id,
              peengineertype:this.user.peengineertype,
              source: this.utils.checkPlatform(),
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

  submitForm(){

    console.log(this.teamForm.status)
   if (this.teamForm.status === 'VALID') {
    // $ev.preventDefault();
    this.utils.showLoading("Saving").then(()=>{
     if(this.designId==0){
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);


       let rolesel = parseInt(this.teamForm.get("userrole").value);
        var senddesignrequestpermission = false;
        if(rolesel == ROLES.Designer || rolesel == ROLES.Admin || rolesel == ROLES.Surveyor || rolesel == ROLES.Peengineer || rolesel == ROLES.Analyst){
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
            this.designData.parent.minpermitdesignaccess,
            this.teamForm.get("peengineertype").value

          )
          .subscribe(
            (response:any) => {
              this.utils.hideLoading().then(() =>{ 
                this.utils.showSnackBar('Team created successfully');
                this.utils.setteamModuleRefresh(true);
                this.router.navigate(['/teamhomepage/team'])
               
    
              });
            },
      
        responseError => {
         this.utils.hideLoading().then(() => {
           const error: ErrorModel = responseError.error;
           this.utils.errorSnackBar(error.message[0].messages[0].message);
         });
  
        })
      }
    else{
      let rolesel = parseInt(this.teamForm.get("userrole").value);
      var senddesignrequestpermission = false;
      if(rolesel == ROLES.Designer || rolesel == ROLES.Admin || rolesel == ROLES.Surveyor || rolesel == ROLES.Peengineer || rolesel == ROLES.Analyst ||  rolesel == ROLES.BD){
        senddesignrequestpermission = true;
      }
      const postdata ={
        firstname:this.teamForm.get("firstname").value,
        lastname :this.teamForm.get("lastname").value,
        email :this.teamForm.get("workemail").value,
        role: parseInt(this.teamForm.get("userrole").value),
        peengineertype:this.teamForm.get("peengineertype").value
      }

      this.apiservices
        .updateTeam(
        postdata,this.designId

        )
        .subscribe(
          (response:any) => {  
        
          
            this.utils.hideLoading().then(() =>{ 
              //this.createChatGroup(response);
              this.router.navigate(['/teamhomepage/team'])
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
         this.utils.errorSnackBar(error.message[0].messages[0].message);
       });

      })
    }
  },
  responseError=>{
    this.utils.hideLoading();
  })
  }
  else{
    if(this.teamForm.value.firstname == '' || this.teamForm.get('firstname').hasError('pattern'))
    {
      this.utils.errorSnackBar("Please check the field first name");
    }
    else if(this.teamForm.value.lastname == '' || this.teamForm.get('lastname').hasError('pattern'))
    {
      this.utils.errorSnackBar("Please check the field lastname");
    }
    else if(this.teamForm.value.workemail == '' || this.teamForm.get('workemail').hasError('pattern'))
    {
      this.utils.errorSnackBar("Please check the field email");
    }
    else{
      this.utils.errorSnackBar("Please check the field user role");
    }
  }
}

roleChange(id)
{
  console.log(id)
  this.roleValue = id;
}

}
