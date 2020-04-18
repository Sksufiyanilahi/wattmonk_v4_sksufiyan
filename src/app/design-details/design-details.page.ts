import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, NavController } from '@ionic/angular';
import { UtilitiesService } from '../utilities.service';
import { ActivatedRoute } from '@angular/router';
import { DesginDataModel } from '../model/design.model';
import { UserRoles } from '../model/constants';
import { AssigneeModel } from '../model/assignee.model';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-design-details',
  templateUrl: './design-details.page.html',
  styleUrls: ['./design-details.page.scss'],
})
export class DesignDetailsPage implements OnInit {

  designId: number;
  design: DesginDataModel;
  listOfAssignees: AssigneeModel[] = [];

  constructor(
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private navController: NavController,
    private alertController: AlertController,
    private storage: StorageService
  ) {
    this.designId = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getDesignDetails();
    this.getAssignees();
  }

  getDesignDetails() {
    this.utilities.showLoading('Getting Design Details').then((success) => {
      this.apiService.getDesginDetail(this.designId).subscribe((result) => {
        this.utilities.hideLoading();
        this.design = result;
        console.log("reaching",this.design);
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
        console.log("result",result);
        this.utilities.hideLoading();
         this.utilities.showSnackBar('Desgin deleted successfully');
         this.navController.pop();
      }, (error) => {
        this.utilities.hideLoading();
        this.utilities.showSnackBar('Some Error Occurred');
      });
    });
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

}
