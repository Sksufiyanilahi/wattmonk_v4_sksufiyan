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

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {

  desginForm: FormGroup;
  minRange = 100;
  maxRange = 10000;

  listOfAssignees: AssigneeModel[] = [];
  listOfSolarMake: SolarMake[] = [];
  isItemSolarMakeAvailable: boolean;
  solarMakeName: any;

  listOfSolarMade: SolarMadeModel[] = [];
  isItemSolarMadeAvailable: boolean;
  solarMadeName: any;

  listOfInverterMake: InverterMakeModel[] = [];
  isItemInverterMakeAvailable: boolean;
  inverterMakeName: any;
  private subscription: Subscription;

  listOfInverterMade: InverterMadeModel[] = [];
  isItemInverterMadeAvailable: boolean;
  inverterMadeName: any;

  emailError = INVALID_EMAIL_MESSAGE;
  fieldRequired = FIELD_REQUIRED;


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utils: UtilitiesService,
    private navController: NavController,
    private storage: StorageService
  ) {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('',  [Validators.required, Validators.pattern(EMAILPATTERN)]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      monthlybill: new FormControl('', [Validators.required]),
      address: new FormControl('',),
      createdby: new FormControl('', [Validators.required]),
      assignedto: new FormControl(''),
      rooftype: new FormControl('', [Validators.required]),
      jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      construction: new FormControl('', [Validators.required]),
      source: new FormControl('android', [Validators.required]),
      comments: new FormControl('')
    });

    this.desginForm.get('solarmake').valueChanges.subscribe(val => {
      this.getSolarMade();
    });
    this.desginForm.get('invertermake').valueChanges.subscribe(val => {
      this.getInverterMade();
    });

    this.utils.getAddressObservable().subscribe((address) => {
      this.desginForm.get('address').setValue(address.address);
      // if(this.desginForm.value.address !== ""){
      //   this.desginForm.patchValue({
      //     address: address
      //   });
      // }else{
      //   this.desginForm.get('address').setValue(address);
      // }
    }, (error) => {
      this.desginForm.get('address').setValue('');
    });
    this.desginForm.patchValue({
      createdby: this.storage.getUserID()
    });
  }

  ngOnInit() {
    this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SAVE_DESIGN_FORM) {
        this.addForm();
      }
    });
    this.getSolarMake();
    this.getInverterMake();
    this.getAssignees();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addForm() {
    console.log('Reach', this.desginForm.value);
    if (this.desginForm.status === 'VALID') {
      this.utils.showLoading('Saving').then(() => {
        this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
          this.utils.sethomepageDesignRefresh(true);
          this.utils.hideLoading().then(() => {
            console.log('Res', response);
            this.navController.pop();
          });
        }, responseError => {
          this.utils.hideLoading().then(() => {
            const error: ErrorModel = responseError.error;
            this.utils.showSnackBar(error.message[0].messages[0].message);
          });

        });
      });

    } else {
      this.showInvalidFormAlert();
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
    this.apiService.getAssignees(UserRoles.DESIGNER).subscribe(assignees => {
      this.listOfAssignees = [];
      this.listOfAssignees.push({
        firstname: '',
        logo: {
          url: '/assets/images/wattmonk_logo.png'
        },
        selected: false,
        id: +this.storage.getUserID()
      });
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
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.showSnackBar(error.message[0].messages[0].message);
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
      this.utils.showSnackBar(error.message[0].messages[0].message);
    });
  }

  getInverterMade() {
    console.log(this.desginForm.get('invertermake').value);
    this.utils.showLoading('Getting inverter models').then((success) => {
      this.apiService.getInverterMade(this.desginForm.get('invertermake').value).subscribe(response => {
        this.utils.hideLoading();
        console.log(response);
        this.listOfInverterMade = response;
      }, responseError => {
        this.utils.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utils.showSnackBar(error.message[0].messages[0].message);
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
      this.utils.showSnackBar(error.message[0].messages[0].message);
    });
  }
}
