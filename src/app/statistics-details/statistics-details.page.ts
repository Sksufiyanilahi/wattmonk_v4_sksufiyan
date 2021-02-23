import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
 

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.page.html',
  styleUrls: ['./statistics-details.page.scss'],
})
export class StatisticsDetailsPage implements OnInit {

  designers:any;
  name:any;
  constructor(private nav:NavParams,
              private modalCtrl:ModalController
              
              ) { }

  ngOnInit() {
    this.designers= this.nav.get('designersValue');
    this.name = this.nav.get('name');
    //this.name = this.nav.get('name');
    console.log(this.name);
  }

  goBack(){
    this.modalCtrl.dismiss({
      'dismissed': true,
      cancel:'cancel'
    });
  }

  ionViewWillleave(){
  }
}
