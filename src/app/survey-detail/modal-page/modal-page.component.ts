import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
  @Input() image_url:any;



  constructor(private navParam:NavParams) { }

  ngOnInit() {

    let image = this.navParam.get('image_url');
    // console.log(image);

  }

}
