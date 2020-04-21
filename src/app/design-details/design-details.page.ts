import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, NavController } from '@ionic/angular';
import { UtilitiesService } from '../utilities.service';
import { ActivatedRoute } from '@angular/router';
import { DesginDataModel } from '../model/design.model';
import { UserRoles } from '../model/constants';
import { AssigneeModel } from '../model/assignee.model';
import { StorageService } from '../storage.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-design-details',
  templateUrl: './design-details.page.html',
  styleUrls: ['./design-details.page.scss'],
})
export class DesignDetailsPage implements OnInit, OnDestroy {

  designId: number;
  design: DesginDataModel;
  assigned = false;
  listOfAssignees: AssigneeModel[] = [];
  dataSubscription: Subscription;
  assigneeForm: FormGroup;

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private storage: StorageService,
    private formBuilder: FormBuilder
  ) {
    this.designId = +this.route.snapshot.paramMap.get('id');
    this.assigneeForm = this.formBuilder.group({
      assignedto: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.dataSubscription = this.utilities.getDesignDetailsRefresh().subscribe((result) => {
      this.getDesignDetails();
      this.getAssignees();
    });
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
    this.utilities.sethomepageDesignRefresh(true);
  }

  getDesignDetails() {
    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.designId).subscribe((result) => {
        this.utilities.hideLoading();
        this.setData(result);
      }, (error) => {
        this.utilities.hideLoading();
      });
    });
  }

  goBack() {
    this.navController.pop();
  }

  editDesign() {

  }

  setData(result: DesginDataModel) {
    this.design = result;
    this.assigned = this.design.assignedto.id !== null && this.design.assignedto.id !== undefined;
  }

  async deleteDesign() {
    const alert = await this.alertController.create({
      header: 'Delete Design',
      subHeader: 'Are you sure you want to delete this design?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.deleteDesignFromServer();
          }
        },
        {
          text: 'Cancel'
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  deleteDesignFromServer() {
    this.utilities.showLoading('Deleting Design').then((success) => {
      this.apiService.deleteDesign(this.designId).subscribe((result) => {
        console.log('result', result);
        this.utilities.hideLoading().then(() => {
          this.utilities.showSnackBar('Desgin deleted successfully');
        });
        this.navController.pop();
      }, (error) => {
        this.utilities.hideLoading().then(() => {
          this.utilities.showSnackBar('Some Error Occurred');
        });

      });
    });
  }

  getAssignees() {
    this.apiService.getAssignees(UserRoles.DESIGNER).subscribe(assignees => {
      this.listOfAssignees = [];
      this.listOfAssignees.push(this.utilities.getDefaultAssignee(this.storage.getUserID()));
      assignees.forEach(item => this.listOfAssignees.push(item));
      console.log(this.listOfAssignees);
    });
  }

  updateAssignee() {
    if (this.assigneeForm.status === 'INVALID') {
      this.utilities.showAlert('Please select an assignee');
    } else {
      this.utilities.showLoading('Updating').then(() => {
        this.apiService.updateDesignForm(this.assigneeForm.value, this.designId).subscribe((success) => {
          this.utilities.hideLoading().then(() => {
            this.setData(success);
          });
        }, (error) => {
          this.utilities.hideLoading().then(() => {
            this.utilities.showSnackBar('Some Error Occurred');
          });
        });
      });

    }
  }
}
