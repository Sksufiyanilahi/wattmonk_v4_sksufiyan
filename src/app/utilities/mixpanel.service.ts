import { Injectable } from '@angular/core';
import { Mixpanel,MixpanelPeople } from '@ionic-native/mixpanel/ngx';
import { Mixpanel_CONSTANTS } from '../contants';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  usePeople:boolean=true
  constructor(private mixpanel:Mixpanel,
              private mixpanelpeople:MixpanelPeople) { }

  initializeMixPanel()
  {
    this.mixpanel.init(Mixpanel_CONSTANTS)
  .then((res)=>{console.log('success',res)})
  .catch((res)=>{console.log('failed',res)});
  }

  setUserDetails(email, name, userid): void{
    var uid = userid.toString();
    this.mixpanel.identify(uid).then((res)=>{console.log(res)}).catch((res)=>{console.log(res)});
    this.mixpanelpeople.set({
      "$email": email,    // only reserved properties need the $
      "$name": name,
      "USER_ID": userid,    // use human-readable names
    });
    // console.log(email,name,userid)
  }

  /**
   * Push new action to mixpanel.
   *
   * @param {string} id Name of the action to track.
   * @param {*} [action={}] Actions object with custom properties.
   * @memberof MixpanelService
   */
  track(id: string, action: any = {}): void {
    this.mixpanel.track(id, action).then((res)=>{console.log(res)})
  }
}
