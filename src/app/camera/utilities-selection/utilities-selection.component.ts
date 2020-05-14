import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ErrorModel } from '../../model/error.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../utilities.service';
import { ApiService } from '../../api.service';
import { ModalController } from '@ionic/angular';
import { InverterMakeModel } from '../../model/inverter-make.model';

@Component({
  selector: 'app-utilities-selection',
  templateUrl: './utilities-selection.component.html',
  styleUrls: ['./utilities-selection.component.scss'],
})
export class UtilitiesSelectionComponent implements OnInit {

  utilitiesForm: FormGroup;
  listOfInverterMade: InverterMakeModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.utilitiesForm = this.formBuilder.group({
      utilities: new FormControl('', [Validators.required])
    });
    this.getUtilities();
  }

  getUtilities() {
    this.apiService.getUtilities().subscribe(response => {
      console.log(response);
      this.listOfInverterMade = response;
      this.cd.detectChanges();
    }, responseError => {
      const error: ErrorModel = responseError.error;
      this.utilities.errorSnackBar(error.message[0].messages[0].message);
    });
  }

  submitForm() {
    if (this.utilitiesForm.status === 'INVALID') {
      this.utilities.errorSnackBar('Please fill inverter details');
    } else {
      this.modalController.dismiss(this.utilitiesForm.value);
    }
  }

}
