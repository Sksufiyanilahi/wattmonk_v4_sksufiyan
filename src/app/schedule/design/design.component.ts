import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AssigneeModel } from 'src/app/model/assignee.model';
import { SolarMake, SolarMakeData } from 'src/app/model/solar-make.model';
import { ApiService } from 'src/app/api.service';
import { UtilitiesService } from 'src/app/utilities.service';
import { ErrorModel } from 'src/app/model/error.model';
import { SolarMadeModel } from 'src/app/model/solar-made.model';
import { InverterMakeModel } from 'src/app/model/inverter-make.model';
import { NavController } from '@ionic/angular';
import { InverterMadeModel } from 'src/app/model/inverter-made.model';
import { ScheduleFormEvent, UserRoles } from '../../model/constants';
import { Subscription } from 'rxjs';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
})
export class DesignComponent implements OnInit, OnDestroy {

  desginForm: FormGroup;
  knobValues: '';
  minRange = 100;
  maxRange = 10000;

  listOfAssignees: AssigneeModel[] = [];
  listOfSolarMAke: SolarMake[] = [];
  isItemSolarMakeAvailable: boolean;
  solarMakeName: any;

  listOfSolarMade: SolarMadeModel[] = [];
  isItemSolarMadeAvailable: boolean;
  solarMadeName: any;

  listOfInverterMAke: InverterMakeModel[] = [];
  isItemInverterMakeAvailable: boolean;
  inverterMakeName: any;
  private subscription: Subscription;

  listOfInverterMade: InverterMadeModel[] = [];
  isItemInverterMadeAvailable: boolean;
  inverterMadeName: any;


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private utils: UtilitiesService,
    private navController: NavController,
    private storage: StorageService
  ) {
    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: '4',
      monthlybill: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      createdby: new FormControl('', [Validators.required]),
      assignedto: 'string',
      rooftype: 'flat',
      jobtype: 'battery',
      source: 'web',
      comment: new FormControl('')
    });
    this.utils.getAddressObservable().subscribe((address) => {
      console.log('Add', address);
      this.desginForm.get('address').setValue(address);
    }, (error) => {
      this.desginForm.get('address').setValue('');
    });
    this.desginForm.patchValue({
      createdby: this.storage.getUserID()
    });
    this.getSolar();
  }

  ngOnInit() {
    this.subscription = this.utils.getScheduleFormEvent().subscribe((event) => {
      if (event === ScheduleFormEvent.SAVE_DESIGN_FORM) {
        this.addForm();
      }
    });

    this.getAssignees();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addForm() {
    console.log('Reach', this.desginForm.value);
    if (this.desginForm.status === 'VALID') {
      this.utils.showLoading('Adding form').then(() => {
        this.apiService.addDesginForm(this.desginForm.value).subscribe(response => {
          this.utils.hideLoading().then(() => {
            console.log('Res', response);
            this.navController.navigateRoot(['homepage']);
          });
        }, responseError => {
          this.utils.hideLoading().then(() => {
            const error: ErrorModel = responseError.error;
            this.utils.showAlert(error.message[0].messages[0].message);
          });

        });
      });

    } else {
      this.utils.showAlert('Invalid Credentials');
    }
  }

  getSolar() {
    this.apiService.getSolarMake().subscribe(response => {
      console.log(response);
      this.listOfSolarMAke = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      console.log(error);
      this.utils.showAlert(error.message[0].messages[0].message);
    });

  }

  getItems(ev: any) {
    if (this.listOfSolarMAke.length === 0) {
      this.getSolar();
    }
    console.log('reach', this.listOfSolarMAke);
    if (ev.target.value !== '') {
      const val = ev.target.value;
      if (val && val.trim() !== '') {
        this.isItemSolarMakeAvailable = true;
        this.listOfSolarMAke = this.listOfSolarMAke.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.isItemSolarMakeAvailable = false;
    }
  }


  selectSolarMake(value) {
    this.solarMakeName = value.name;
    this.desginForm.patchValue({
      solarmake: value.id
    });
    this.isItemSolarMakeAvailable = false;
  }

  getSolarMade() {
    this.apiService.getSolarMade(this.desginForm.value.solarmake).subscribe(response => {
      console.log(response);
      this.listOfSolarMade = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utils.showAlert(error.message[0].messages[0].message);
    });

  }

  getItemsSolarMade(ev: any) {
    if (this.listOfSolarMade.length === 0) {
      this.getSolarMade();
    }
    if (ev.target.value !== '') {
      const val = ev.target.value;
      if (val && val.trim() !== '') {
        this.isItemSolarMadeAvailable = true;
        this.listOfSolarMade = this.listOfSolarMade.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.isItemSolarMadeAvailable = false;
    }
  }

  selectSolarMade(value) {
    this.solarMadeName = value.name;
    this.desginForm.patchValue({
      solarmodel: value.id
    });
    this.isItemSolarMadeAvailable = false;
  }

  getInverter() {
    this.apiService.getInverterMake().subscribe(response => {
      console.log(response);
      this.listOfInverterMAke = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utils.showAlert(error.message[0].messages[0].message);
    });

  }

  getItemsInverterMake(ev: any) {
    if (this.listOfInverterMAke.length === 0) {
      this.getInverter();
    }
    console.log('reach', this.listOfSolarMAke);
    if (ev.target.value !== '') {
      const val = ev.target.value;
      if (val && val.trim() !== '') {
        this.isItemInverterMakeAvailable = true;
        this.listOfInverterMAke = this.listOfInverterMAke.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.isItemInverterMakeAvailable = false;
    }
  }

  selectInverterMake(value) {
    this.inverterMakeName = value.name;
    this.desginForm.patchValue({
      invertermake: value.id
    });
    this.isItemInverterMakeAvailable = false;
  }


  getInverterMade() {
    this.apiService.getInverterMade(this.desginForm.value.invertermodel).subscribe(response => {
      console.log(response);
      this.listOfInverterMade = response;
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utils.showAlert(error.message[0].messages[0].message);
    });

  }

  getItemsInverterMade(ev: any) {
    if (this.listOfInverterMade.length === 0) {
      this.getInverterMade();
    }
    if (ev.target.value !== '') {
      const val = ev.target.value;
      if (val && val.trim() !== '') {
        this.isItemInverterMadeAvailable = true;
        this.listOfInverterMade = this.listOfInverterMade.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
    } else {
      this.isItemInverterMadeAvailable = false;
    }
  }

  selectInverterMade(value) {
    this.inverterMadeName = value.name;
    this.desginForm.patchValue({
      invertermodel: value.id
    });
    this.isItemInverterMadeAvailable = false;
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
        id: this.storage.getUser().id
      });
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

}
