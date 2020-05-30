import { Component, Input, OnInit } from '@angular/core';
import { LeftoverImagesModel } from '../../model/leftover-images.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-error-list',
  templateUrl: './image-error-list.component.html',
  styleUrls: ['./image-error-list.component.scss'],
})
export class ImageErrorListComponent implements OnInit {

  @Input() listOfImages: LeftoverImagesModel[];

  constructor(
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
  }

  openImage(image: LeftoverImagesModel) {
    this.modalController.dismiss({
      imageToLoad: image
    });
  }
}
