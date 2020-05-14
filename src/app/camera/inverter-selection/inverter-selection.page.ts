import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorModel } from '../../model/error.model';
import { UtilitiesService } from '../../utilities.service';
import { ApiService } from '../../api.service';
import { InverterMakeModel } from '../../model/inverter-make.model';
import { InverterMadeModel } from '../../model/inverter-made.model';
import { ModalController } from '@ionic/angular';
import { AutoCompleteComponent } from '../../utilities/auto-complete/auto-complete.component';

@Component({
  selector: 'app-inverter-selection',
  templateUrl: './inverter-selection.page.html',
  styleUrls: ['./inverter-selection.page.scss'],
})
export class InverterSelectionPage implements OnInit {

  inverterForm: FormGroup;
  listOfInverterMade: InverterMadeModel[] = [];
  listOfInverterMake: InverterMakeModel[] = [];

  @ViewChild('make', { static: true }) make: AutoCompleteComponent;
  @ViewChild('model', { static: true }) model: AutoCompleteComponent;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.inverterForm = this.formBuilder.group({
      invertermake: new FormControl('', [Validators.required]),
      invertermodel: new FormControl('', [Validators.required])
    });

    this.inverterForm.get('invertermake').valueChanges.subscribe(val => {
      this.getInverterMade();
    });
    this.getInverterMake();
  }

  getInverterMade() {
    console.log(this.inverterForm.get('invertermake').value);
    this.utilities.showLoading('Getting inverter models').then((success) => {
      this.apiService.getInverterMade(this.inverterForm.get('invertermake').value.id).subscribe(response => {
        this.utilities.hideLoading();
        console.log(response);
        this.listOfInverterMade = response;
        this.inverterForm.patchValue({
          invertermodel: ''
        });
      }, responseError => {
        this.utilities.hideLoading();
        const error: ErrorModel = responseError.error;
        this.utilities.errorSnackBar(error.message[0].messages[0].message);
      });
    });

  }

  getInverterMake() {
    this.utilities.showLoading('Loading').then(() => {
      this.apiService.getInverterMake().subscribe(response => {
        this.utilities.hideLoading().then(() => {
          console.log(response);
          this.listOfInverterMake = response;
          console.log(this.listOfInverterMake);
          this.cd.detectChanges();
        });
      }, responseError => {
        this.utilities.hideLoading().then(() => {
          const error: ErrorModel = responseError.error;
          this.utilities.errorSnackBar(error.message[0].messages[0].message);
        });
      });
    });

  }

  submitForm() {
    if (this.inverterForm.status === 'INVALID') {
      if (this.make.selectedDataName === '' || this.make.selectedDataName === '') {
        this.utilities.errorSnackBar('Please fill inverter details');
      } else {
        console.log(this.make);
        this.modalController.dismiss({
          invertermake: this.make.selectedDataName,
          invertermodel: this.model.selectedDataName
        });
      }
    } else {
      this.modalController.dismiss({
        invertermake: this.make.selectedDataName,
        invertermodel: this.model.selectedDataName
      });
    }
  }
}
