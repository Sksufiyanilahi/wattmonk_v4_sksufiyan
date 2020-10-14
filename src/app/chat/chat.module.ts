import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { Chooser } from '@ionic-native/chooser/ngx';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule
  ],
  declarations: [ChatPage, ImageViewerComponent],
  providers: [
    Chooser,
    InAppBrowser,
    // ImagePicker
  ]
})
export class ChatPageModule {
}
