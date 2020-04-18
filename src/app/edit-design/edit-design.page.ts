import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilitiesService } from '../utilities.service';
import { DesginDataModel, DesignModel } from '../model/design.model';
import { ApiService } from '../api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../storage.service';
import { InverterMakeModel } from '../model/inverter-make.model';
import { InverterMadeModel } from '../model/inverter-made.model';
import { Subscription } from 'rxjs';
import { SolarMadeModel } from '../model/solar-made.model';
import { SolarMake } from '../model/solar-make.model';
import { AssigneeModel } from '../model/assignee.model';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessageList, ErrorModel } from '../model/error.model';
import { UserRoles } from '../model/constants';

@Component({
  selector: 'app-edit-design',
  templateUrl: './edit-design.page.html',
  styleUrls: ['./edit-design.page.scss'],
})
export class EditDesignPage implements OnInit {

  designId: number;
  design: DesginDataModel;

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

  constructor(
    private navController: NavController,
    private utils: UtilitiesService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private storage: StorageService,
    private route: ActivatedRoute
  ) {
    this.designId = +this.route.snapshot.paramMap.get('id');

    this.desginForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      solarmake: new FormControl('', [Validators.required]),
      solarmodel: new FormControl('', [Validators.required]),
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required]),
      monthlybill: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      createdby: new FormControl('', [Validators.required]),
      assignedto: new FormControl(''),
      rooftype: new FormControl('', [Validators.required]),
      jobtype: new FormControl('', [Validators.required]),
      projecttype: new FormControl('', [Validators.required]),
      construction: new FormControl('', [Validators.required]),
      source: new FormControl('android', [Validators.required]),
      comments: new FormControl('')
    });
  }

  ngOnInit() {
    this.getDesignDetails();
    this.getAssignees();
  }

  getDesignDetails() {
    this.utils.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.designId).subscribe((result) => {
        this.utils.hideLoading();
        this.design = result;

        this.desginForm.patchValue({
          name: this.design.name,
          email: this.design.email,
          monthlybill: this.design.monthlybill,
          address: this.design.address,
          createdby: this.design.createdby.id,
          rooftype: this.design.rooftype,
          jobtype: this.design.jobtype,
          comments: this.design.comments
        });

        this.getSolarMakeForForm();
        this.getInverterMakeForForm();
      }, (error) => {
        this.utils.hideLoading();
      });
    });
  }

  goBack() {
    this.navController.pop();
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
        if (error.message instanceof String) {
          this.utils.showAlert(error.message);
        } else if (error.message instanceof Array) {
          this.utils.showAlert(error.message[0].messages[0].message);
        }
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
      if (error.message instanceof String) {
        this.utils.showAlert(error.message);
      } else if (error.message instanceof Array) {
        this.utils.showAlert(error.message[0].messages[0].message);
      }
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
        if (error.message instanceof String) {
          this.utils.showAlert(error.message);
        } else if (error.message instanceof Array) {
          this.utils.showAlert(error.message[0].messages[0].message);
        }
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
      if (error.message instanceof String) {
        this.utils.showAlert(error.message);
      } else if (error.message instanceof Array) {
        this.utils.showAlert(error.message[0].messages[0].message);
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
          this.utils.showAlert(error.message);
        } else if (error.message instanceof Array) {
          this.utils.showAlert(error.message[0].messages[0].message);
        }
      });
    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.showAlert(error.message);
      } else if (error.message instanceof Array) {
        this.utils.showAlert(error.message[0].messages[0].message);
      }
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
          this.utils.showAlert(error.message);
        } else if (error.message instanceof Array) {
          this.utils.showAlert(error.message[0].messages[0].message);
        }
      });

    }, responseError => {
      const error: ErrorModel = responseError.error;
      if (error.message instanceof String) {
        this.utils.showAlert(error.message);
      } else if (error.message instanceof Array) {
        this.utils.showAlert(error.message[0].messages[0].message);
      }
    });
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

  updateDesign() {
    if (this.desginForm.status === 'VALID') {
      this.utils.showLoading('Updating').then(() => {
        this.apiService.updateDesignForm(this.desginForm.value, this.designId).subscribe(response => {
          this.utils.hideLoading().then(() => {
            this.utils.setDesignDetailsRefresh(true);
            console.log('Res', response);
            this.utils.showSnackBar('Desgin updated successfully')
            this.navController.pop();
          });
        }, responseError => {
          this.utils.hideLoading().then(() => {
            const error: ErrorModel = responseError.error;
            if (error.message instanceof String) {
              this.utils.showAlert(error.message);
            } else if (error.message instanceof Array) {
              this.utils.showAlert(error.message[0].messages[0].message);
            }

          });

        });
      });

    } else {
      this.showInvalidFormAlert();
    }
  }
}
