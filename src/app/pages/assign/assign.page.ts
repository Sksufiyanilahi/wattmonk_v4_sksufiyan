import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AssigneeModel } from 'src/app/models/assignee.model';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { User } from 'src/app/models/user.model';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
@Component({
    selector: 'app-assign',
    templateUrl: './assign.page.html',
    styleUrls: ['./assign.page.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: AssignPage
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: AssignPage
        }
    ]

})


export class AssignPage implements ControlValueAccessor, Validator, OnInit, OnChanges {

    assignForm: FormGroup;
    surveyId = 0;
    id = 0;
    surveyData: [];
    reviewAssignedTo: any = [];
    assignedto = [];
    showBottomDraw: boolean = false;
    userData: User; selectedDesigner: User;
    assignees: AssigneeModel[] = [];
    filteredAssignees: AssigneeModel[];
    @Input() placeholder = 'Assign to';
    @Input() required = false;
    @Output() assigneeData = new EventEmitter<AssigneeModel>();
    public onChange: (assignee: number) => void;
    selectedUserId = null;
    @Input() reviewAssigned: any;
    userId: any;
    searchTerm: any = '';
    assignedDateTime: any;
    public isBtnAssignText: boolean = false;

    constructor(private storage: StorageService,
        public modalController: ModalController,
        private nav: NavParams,
        public utils: UtilitiesService,
        private apiService: ApiService,
        private toastController: ToastController,

        private formBuilder: FormBuilder) {
        this.id = this.nav.get('memberid');
        this.surveyData = this.nav.get('surveyData');
        this.assignedDateTime = this.nav.get('assignedDateTime');
        this.isBtnAssignText = this.nav.get('isBtnAssignText');

        this.assignees = this.nav.get('surveyData');
        this.assignForm = this.formBuilder.group({
            assignedto: new FormControl(0, [Validators.required]),
            status: new FormControl('assigned', [Validators.required])
        });
    }

    ngOnInit() {
        this.userId = this.storage.getUserID();
        // this.getuser();
        this.filterUsers();
    }



    async errorSnackBar(message) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            cssClass: 'my-custom-error-class'
        });
        await toast.present();
    }

    dismiss() {

        if (this.selectedUserId !== null) {
            // this.modalController.dismiss();
            this.modalController.dismiss({
                'dismissed': true,
                isCreatGroupChat: this.isBtnAssignText
            }, 'destructive');
        } else {
            // this.errorSnackBar('Please select a surveyor');
            // this.modalController.dismiss();
            this.modalController.dismiss({
                'dismissed': true,
                isCreatGroupChat: this.isBtnAssignText
            }, 'destructive');
            // console.log('Assignee is required');
        }




    }

    /*
      getuser(){
    
        this.filteredAssignees = [];
    
        
        this.surveyData = this.surveyData;
        this.reviewAssignedTo = this.surveyData['assignedto'];
        if (this.filteredAssignees.length === 0) {
            this.utils.showLoading('Getting Surveyors').then(() => {
                this.apiService.getSurveyors().subscribe(assignees => {
                    this.utils.hideLoading().then(async () => {
                        this.filteredAssignees = [];
                        // this.filteredAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
                        assignees.forEach(item => this.filteredAssignees.push(item));
    
                 
                     console.log('assignees'+ JSON.stringify(assignees));
                     
                   
                       
    
    
                        this.surveyId = this.id;
                        this.utils.setBottomBarHomepage(false);
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
            this.surveyId = this.id;
            this.utils.setBottomBarHomepage(false);
          
            this.assignForm.patchValue({
                assignedto: ''
            });
        }
    
      }*/
    ionViewDidLeave() {

    }


    ngOnChanges() {
        this.filterUsers();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {

    }

    writeValue(assignee: number): void {
        this.selectedUserId = assignee;
        this.assignees.forEach((item) => {
            item.selected = item.id === this.selectedUserId;
        });
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.required) {

            if (this.selectedUserId !== null) {
                return null;
            }
            return {
                error: 'Please select a surveyor'
            };
        }

        return null;

    }

    selectAssignee(assignee: AssigneeModel) {

        if (this.reviewAssigned != null && this.reviewAssigned.id != this.userId) {
            const element = <HTMLElement>document.getElementById('pre');
            //element.className='active';


        }


        this.assigneeData.emit(assignee);
        this.assignees.forEach((item) => {
            item.selected = false;

        });

        if (assignee.id === this.selectedUserId) {
            this.selectedUserId = null;
            //this.onChange(null);
        } else {
            assignee.selected = true;


            this.selectedUserId = assignee;
            //this.onChange(assignee.id);
        }
    }

    selectSelf() {

    }

    filterUsers() {
        this.filteredAssignees = this.assignees.filter((assignee: User) => {
            return assignee.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
                || assignee.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
                || assignee.email.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1

        });
    }



    assignToSurveyor() {
        if (this.selectedUserId !== null) {
            this.modalController.dismiss({
                'dismissed': true,

                //value:this.filteredAssignees,
                id: this.selectedUserId.id,
                uData: this.selectedUserId
                // assignedId:this.assignedId,
                // assignedAnalystId:this.assignedAnalystId
            }, 'destructive');


        }
        else {

            this.errorSnackBar('Please select a surveyor');

            console.log('Assignee is required');
        }




    }




    /*
    
        assignToSurveyor() {
    
          if (this.assignForm.status === 'INVALID' && (this.filteredAssignees.status === 'reviewassigned' || this.assignees.status === 'reviewfailed' || this.assignees.status === 'reviewpassed')) {
              this.utils.errorSnackBar('Please select a analyst');
          } else if (this.assignForm.status === 'INVALID') {
              this.utils.errorSnackBar('Please select a surveyor');
          } else if (this.reviewAssignedTo != null && (this.selectedDesigner.id == this.reviewAssignedTo.id)) {
              this.utils.errorSnackBar("This survey request has been already assigned to" + " " + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname)
    
          } else {
    
    
              var surveystarttime = new Date();
              var milisecond = surveystarttime.getTime();
              var additonalhours = 0;
              if (this.assignees.requesttype == "prelim") {
    
                  additonalhours = this.selectedDesigner.jobcount * 2;
    
                  surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
              } else {
                  additonalhours = this.selectedDesigner.jobcount * 6;
                  surveystarttime.setHours(surveystarttime.getHours() + additonalhours);
              }
    
              var postData = {};
              if (this.assignees.createdby.id == this.userData.id) {
                  if (this.selectedDesigner.parent.id == this.userData.parent.id) {
                      if (this.selectedDesigner.role.type == "qcinspector") {
                          postData = {
                              reviewassignedto: this.selectedDesigner.id,
                              status: "reviewassigned",
                              reviewstarttime: milisecond
                          };
                      }
                      if (this.selectedDesigner.role.type == "surveyors") {
                          postData = {
                              assignedto: this.selectedDesigner.id,
                              isoutsourced: "false",
                              status: "assigned",
                              surveystarttime: surveystarttime
                          };
    
                      }
    
                  } else {
                      postData = {
                          outsourcedto: this.selectedDesigner.id,
                          isoutsourced: "true",
                          status: "outsourced"
                      };
                  }
              } else {
                  if (this.selectedDesigner.role.type == "surveyors") {
                      postData = {
                          assignedto: this.selectedDesigner.id,
                          status: "assigned",
                          surveystarttime: surveystarttime
                      };
                  }
                  if (this.selectedDesigner.role.type == "qcinspector") {
                      postData = {
                          reviewassignedto: this.selectedDesigner.id,
                          status: "reviewassigned",
                          reviewstarttime: milisecond
                      };
                  }
              }
              this.utils.showLoading('Assigning').then(() => {
                  this.apiService.updateSurveyForm(postData, this.surveyId).subscribe((value) => {
                      this.utils.hideLoading().then(() => {
                          //this.createNewDesignChatGroup(value);
                          this.utils.showSnackBar('Survey request has been assigned to' + ' ' + this.selectedDesigner.firstname + " " + this.selectedDesigner.lastname + ' ' + 'successfully');
    
                          this.dismiss();
                          this.showBottomDraw = false;
                          this.utils.sethomepageSurveyRefresh(true);
                          //this.addUserToGroupChat();
                          //this.getSurveys(null);
                      })
                  }, (error) => {
                      this.utils.hideLoading();
                      this.dismiss();
                      this.showBottomDraw = false;
                  });
              });
          }
      }
    */

}

