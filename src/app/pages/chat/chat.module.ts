import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { MentionModule } from 'angular-mentions';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,MentionModule
  ],
  declarations: [
    ChatPage,
    ImageViewerComponent
  ],
  providers: [
    Chooser,
    InAppBrowser,
    ImagePicker,
    File,
    DatePipe
  ]
})
export class ChatPageModule {}
