import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssigneeModel } from 'src/app/model/assignee.model';
import { SolarMake } from 'src/app/model/solar-make.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { SolarMadeModel } from 'src/app/model/solar-made.model';
import { InverterMakeModel } from 'src/app/model/inverter-make.model';
import { NavController } from '@ionic/angular';
import { InverterMadeModel } from 'src/app/model/inverter-made.model';
import { ScheduleFormEvent, UserRoles, INVALID_EMAIL_MESSAGE, FIELD_REQUIRED } from '../../model/constants';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';
import { ActivatedRoute } from '@angular/router';
import { DesginDataModel, DesignModel } from '../../model/design.model';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {

  desginForm: FormGroup;

  listOfAssignees: AssigneeModel[] = [];

  listOfSolarMake: SolarMake[] = [];
  listOfSolarMade: SolarMadeModel[] = [];

  listOfInverterMade: InverterMadeModel[] = [];
  listOfInverterMake: InverterMakeModel[] = [];

  private subscription: Subscription;
  private addressSubscription: Subscription;

  emailError = INVALID_EMAIL_MESSAGE;
  fieldRequired = FIELD_REQUIRED;

  designId = 0;
  design: DesginDataModel = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utils: UtilitiesService,
    private navController: NavController,
    private storage: StorageService,
    private route: ActivatedRoute
  ) {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      monthlybill: new FormControl('', [Validators.required]),
      address: new FormControl('',[Validators.required]),
      createdby: new FormControl('', [Validators.required]),
      assignedto: new FormControl(''),
      rooftype: new FormControl('', [Validators.required]),
      jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      newconstruction: new FormControl('', [Validators.required]),
      source: new FormControl('android', [Validators.required]),
      comments: new FormControl(''),
      requesttype: new FormControl('prelim', [Validators.required]),
    });

    this.designId = +this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SAVE_DESIGN_FORM) {
        this.addForm();
      }
    });

    if (this.designId !== 0) {
      this.getDesignDetails();

    } else {
      this.desginForm.get('solarmake').valueChanges.subscribe(val => {
        this.getSolarMade();
      });
      this.desginForm.get('invertermake').valueChanges.subscribe(val => {
        this.getInverterMade();
      });
      this.addressSubscription = this.utils.getAddressObservable().subscribe((address) => {
        this.desginForm.get('address').setValue(address.address);
      }, (error) => {
        this.desginForm.get('address').setValue('');
      });
      this.desginForm.patchValue({
        createdby: this.storage.getUserID()
      });
      this.getSolarMake();
      this.getInverterMake();
    }

    this.getAssignees();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.designId === 0) {
      this.addressSubscription.unsubscribe();
    }
  }

  getDesignDetails() {
    this.utils.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.designId).subscribe((result) => {
        this.utils.hideLoading();
        this.design = result;

        console.log(this.design);
        this.desginForm.patchValue({
          name: this.design.name,
          email: this.design.email,
          monthlybill: this.design.monthlybill,
          address: this.design.address,
          createdby: this.design.createdby.id,
          rooftype: this.design.rooftype,
          jobtype: this.design.jobtype,
          comments: this.design.comments,
          projecttype: this.design.projecttype,
          newconstruction: this.design.newconstruction + ''
        });
        this.utils.setStaticAddress(this.design.address);

        if (this.design.assignedto.id !== null && this.design.assignedto.id !== undefined) {
          this.desginForm.patchValue({
            assignedto: this.design.assignedto.id
          });
        }

        this.getSolarMakeForForm();
        this.getInverterMakeForForm();
      }, (error) => {
        this.utils.hideLoading();
      });
    });
  }

  getSolarMakeForForm() {
    this.apiService.getSolarMake().subscribe(response => {
      this.listOfSolarMake = response;

      this.apiService.getSolarMade(this.design.solarmake.id).subscribe(solarresponse => {
        this.utils.hideLoading();
        this.listOfSolarMade = solarresponse;
        console.log(solarresponse);
        console.log('patching solar');
        setTimeout(() => {
          this.desginForm.patchValue({
            solarmake: this.design.solarmake.id,
            solarmodel: this.design.solarmodel.id
          });
          this.desginForm.get('solarmake').valueChanges.subscribe(val => {
            this.getSolarMade();
          });
        }, 500);
      }, solarResponseError => {
        this.utils.hideLoading();
        const error: ErrorModel = solarResponseError.error;
        if (error.message instanceof String) {
          this.utils.errorSnackBar(error.message);
        } else if (error.message instanceof Array) {
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        }
      });

    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.errorSnackBar(error.message);
      } else if (error.message instanceof Array) {
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      }
    });
  }

  getInverterMakeForForm() {
    this.apiService.getInverterMake().subscribe(response => {
      console.log(response);
      this.listOfInverterMake = response;

      this.apiService.getInverterMade(this.design.invertermake.id).subscribe(makeResponse => {
        this.utils.hideLoading();
        console.log('patching inverter');
        this.listOfInverterMade = makeResponse;

        setTimeout(() => {
          this.desginForm.patchValue({
            invertermake: this.design.invertermake.id,
            invertermodel: this.design.invertermodel.id
          });
          this.desginForm.get('invertermake').valueChanges.subscribe(val => {
            this.getInverterMade();
          });
        }, 500);


      }, makeResponseError => {
        this.utils.hideLoading();
        const error: ErrorModel = makeResponseError.error;
        if (error.message instanceof String) {
          this.utils.errorSnackBar(error.message);
        } else if (error.message instanceof Array) {
          this.utils.errorSnackBar(error.message[0].messages[0].message);
        }
      });
    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.errorSnackBar(error.message);
      } else if (error.message instanceof Array) {
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      }
    });
  }

  addForm() {
    console.log('Reach', this.desginForm.value);
    if (this.desginForm.status === 'VALID') {
      this.utils.showLoading('Saving').then(() => {
        if (this.designId === 0) {
          this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
            this.utils.hideLoading().then(() => {
              console.log('Res', response);
              this.utils.showSuccessModal('Desgin have been saved').then((modal) => {
                modal.present();
                modal.onWillDismiss().then((dismissed) => {
                  this.utils.setHomepageDesignRefresh(true);
                  this.navController.pop();
                });
              });
            });
          }, responseError => {
            this.utils.hideLoading().then(() => {
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message[0].messages[0].message);
            });
          });

        } else {
          this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
            this.utils.hideLoading().then(() => {
              console.log('Res', response);
              this.utils.showSnackBar('Desgin have been updated');
              this.utils.setHomepageDesignRefresh(true);
              this.navController.pop();
            });
          }, responseError => {
            this.utils.hideLoading().then(() => {
              const error: ErrorModel = responseError.error;
              this.utils.errorSnackBar(error.message[0].messages[0].message);
            });

          });
        }

      });

    } else {
      this.utils.errorSnackBar('Invalid form detail')
    }
  }

  showInvalidFormAlert() {
    let error = '';
    Object.keys(this.desginForm.controls).forEach((key: string) => {
      const control: AbstractControl = this.desginForm.get(key);
      if (control.invalid) {
        if (error !== '') {
          error = error + '<br/>';
        }
        if (control.errors.required === true) {
          error = error + this.utils.capitalizeWord(key) + ' is required';
        }
        if (control.errors.email === true) {
          error = error + 'Invalid email';
        }
        if (control.errors.error !== null && control.errors.error !== undefined) {
          error = error + control.errors.error;
        }
      }
    });
    console.log(this.desginForm.value);
    this.utils.showAlert(error);
  }


  getAssignees() {
    this.apiService.getDesigners(UserRoles.DESIGNER).subscribe(assignees => {
      this.listOfAssignees = [];
      // this.listOfAssignees.push(this.utils.getDefaultAssignee(this.storage.getUserID()));
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

  getSolarMade() {
    this.utils.showLoading('Getting solar models').then((success) => {
      this.apiService.getSolarMade(this.desginForm.get('solarmake').value).subscribe(response => {
        this.utils.hideLoading();
        console.log(response);
        this.listOfSolarMade = response;
        this.desginForm.patchValue({
          solarmodel: ''
        });
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      });
    }, (error) => {

    });


  }

  getSolarMake() {
    this.apiService.getSolarMake().subscribe(response => {
      this.listOfSolarMake = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      console.log(error);
      this.utils.errorSnackBar(error.message[0].messages[0].message);
    });
  }

  getInverterMade() {
    console.log(this.desginForm.get('invertermake').value);
    this.utils.showLoading('Getting inverter models').then((success) => {
      this.apiService.getInverterMade(this.desginForm.get('invertermake').value).subscribe(response => {
        this.utils.hideLoading();
        console.log(response);
        this.listOfInverterMade = response;
        this.desginForm.patchValue({
          invertermodel: ''
        });
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.errorSnackBar(error.message[0].messages[0].message);
      });
    }, (reject) => {

    });

  }

  getInverterMake() {
    this.apiService.getInverterMake().subscribe(response => {
      console.log(response);
      this.listOfInverterMake = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utils.errorSnackBar(error.message[0].messages[0].message);
    });
  }
}
