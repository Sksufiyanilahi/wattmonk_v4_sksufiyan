import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FIELD_REQUIRED, INVALID_PHONE_NUMBER } from 'src/app/models/constants';
import { ErrorModel } from 'src/app/models/error.model';
import { ApiService } from 'src/app/services/api/api.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { NetworkDetectService } from 'src/app/services/network-detect/network-detect.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-group-schedule',
  templateUrl: './group-schedule.page.html',
  styleUrls: ['./group-schedule.page.scss'],
})
export class GroupSchedulePage implements OnInit {


  @ViewChild('clientInput') clientInput: ElementRef<HTMLInputElement>
  @ViewChild('membersInput') membersInput: ElementRef<HTMLInputElement>

  groupForm: FormGroup;
  fieldRequired = FIELD_REQUIRED;
  groupnameError = "Invalid group name";
  descriptionError = "Invalid description";
  contactError = INVALID_PHONE_NUMBER;
  deactivateNetworkSwitch: Subscription;
  showFooter = true;
  user: any;
  data: any;
  userData: any;
  designData: any;
  isEditMode: boolean = false;
  fieldDisabled = false;
  userdata: any;
  designId = 0;
  tabsDisabled = false;
  isEdit: boolean = true;
  members: any = [];
  membersList: any[] = this.members
  selectedmembers: string[] = []
  selectedmembersId: number[] = []
  selectedclients: string[] = []
  selectedclientsId: number[] = []
  clientcompany: any = [];
  companyList: any[] = this.clientcompany;
  removable = true;
  clients: any[] = [];
  membersValue: any[] = [];
  selectable:boolean=true;

  constructor(private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private apiservices: ApiService,
    private utils: UtilitiesService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private network: NetworkDetectService,
    private navController: NavController,
    private router: Router,
    private mixpanelService: MixpanelService,

  ) {
    const MAILFORMAT = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;
    //const COMPANYFORMAT = '[a-zA-Z0-9. ]{3,}';
    this.groupForm = this.formBuilder.group({

      // groupname:new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      // description:new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z. ]{3,}$")]),
      // members:new FormControl('',[Validators.required, Validators.pattern(MAILFORMAT)]),
      // clients : new FormControl('',[Validators.required])
      groupname: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z_ ]{3,}$")]),
      description: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z_ ]{3,}$")]),
      members: new FormControl('', [Validators.required]),
      clients: new FormControl('', [Validators.required])
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
    if (this.designId !== 0) {

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
    if (this.designId !== 0) {
      setTimeout(() => {
        this.isEditMode = true;
        this.getDesignDetails();
      }, 1000)

    }
    this.fetchTeamData();
    this.fetchClientSuperamin();
  }
  goBack() {
    this.mixpanelService.track("TEAM_PAGE_CLOSE", {
    });
    this.navController.pop();

  }


  getDesignDetails() {
    this.user = this.data;

    this.fieldDisabled = true;
    this.groupForm.patchValue({
      groupname: this.user.name,
      description: this.user.description,
     // members: this.user.members,
      // clients:this.clients
    });
    this.user.members.forEach((element) => {
      this.selectedmembers.push(element.firstname+element.lastname);
      this.selectedmembersId.push(element.id);
    })

    this.user.clients.forEach((element) => {
      if(element.company!=null){
      this.selectedclients.push(element.company);
      }
      else{
        this.selectedclients.push(element.email);
      }
      this.selectedclientsId.push(element.id);
    })


    //     })
    //   },(error) => {
    //     this.utils.hideLoading();
    //   })
    // })
  }

  submitForm() {
    this.groupForm.get('members').setValue(this.selectedmembers);
    this.groupForm.get('clients').setValue(this.selectedclients);
    if (this.groupForm.status === 'VALID') {
      // $ev.preventDefault();
      this.utils.showLoading("Saving").then(() => {
        if (this.designId == 0) {
          const postData = {
            name: this.groupForm.get('groupname').value,
            description: this.groupForm.get('description').value,
            members: this.selectedmembersId,
            clients: this.selectedclientsId,
            status: true
          }
          //this.utils.showLoading('Getting Design Details').then(() => {

          this.apiservices
            .addGroup(postData)
            .subscribe(
              (response: any) => {
                this.utils.hideLoading().then(() => {
                  //this.createChatGroup(response);
                  this.utils.setteamModuleRefresh(true);
                  this.utils.showSnackBar('Group created successfully');
                  this.router.navigate(['/team-home/group'])

                });
              },
              responseError => {
                this.utils.hideLoading().then(() => {
                  const error: ErrorModel = responseError.error;
                  this.utils.errorSnackBar(error.message[0].messages[0].message);
                });

              })
        }
        else {
          const postData = {
            name: this.groupForm.get('groupname').value,
            description: this.groupForm.get('description').value,
            members: this.selectedmembersId,
            clients: this.selectedclientsId,
            status: true
          }
          this.apiservices.updateGroupData(this.designId, postData).subscribe((response: any) => {
            this.utils.hideLoading().then(() => {
              this.router.navigate(['/team-home/group']);
              this.utils.showSnackBar("Group updated succesfully");
              this.utils.setteamModuleRefresh(true);
            })
          }, responseError => {
            this.utils.hideLoading();
            const error: ErrorModel = responseError.error;
            this.utils.errorSnackBar(error.message[0].messages[0].message);
          })
        }
      })
    }
    else {
      if (this.groupForm.value.groupname == '' || this.groupForm.get('groupname').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field group name");
      }
      else if (this.groupForm.value.description == '' || this.groupForm.get('description').hasError('pattern')) {
        this.utils.errorSnackBar("Please check the field description");
      }
      else if (this.groupForm.value.members == '') {
        this.utils.errorSnackBar("Please check the field members");
      }
      else {
        this.utils.errorSnackBar("Please check the field clients");
      }
    }
  }

  fetchTeamData() {
    this.apiservices.getTeamData().subscribe(
      response => {
        response.forEach((element) => {
          if (element.company != null) {
            this.members.push({
              id: element.id,
              name: element.firstname + element.lastname,
            });
          }
        });
      },
      error => {
        this.utils.errorSnackBar("Error");
      }
    );
  }

  setSelectMember(event) {
    this.selectedmembers.push(event.option.viewValue);
    this.selectedmembersId.push(event.option.value.id)
    this.membersInput.nativeElement.value = '';
   // this.groupForm.get('members').setValue('');
  }

  fetchClientSuperamin() {
    this.apiservices.getClientSuperadmin().subscribe(
      (response) => {
        response.forEach((element) => {
          if (element.company != null) {
            this.clientcompany.push({
              id: element.id,
              company: element.company,
            });
          }
          if (element.company == null) {
            this.clientcompany.push({ id: element.id, company: element.email });
          }
        });
      },
      (error) => { }
    );
  }

  setSelectClient(event) {
    this.selectedclients.push(event.option.viewValue);
    this.selectedclientsId.push(event.option.value.id)
    this.clientInput.nativeElement.value = '';
    //this.groupForm.get('clients').setValue('');
  }

  removemember(client: string, index): void {
    this.selectedmembers.splice(index, 1);
    this.selectedmembersId.splice(index, 1);
  }

  removeclient(client: string, index): void {
    this.selectedclients.splice(index, 1);
    this.selectedclientsId.splice(index, 1);
  }


}
