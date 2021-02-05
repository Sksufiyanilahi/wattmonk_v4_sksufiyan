import { Injectable } from '@angular/core';
import { Mixpanel,MixpanelPeople } from '@ionic-native/mixpanel/ngx';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor(private mixpanel:Mixpanel,
              private mixpanelpeople:MixpanelPeople) { }

  initializeMixPanel()
  {
    this.mixpanel.init('e4b30b18d61b5abe078c2719911858cb')
  .then((res)=>{console.log('success',res)})
  .catch((res)=>{console.log('failed',res)});
  }

  setUserDetails(email, name, userid): void{
    this.mixpanel.identify(userid);
    this.mixpanelpeople.set({
      "$email": email,    // only reserved properties need the $
      "$name": name,
      "USER_ID": userid,    // use human-readable names
    });
    console.log(email,name,userid)
  }

  /**
   * Push new action to mixpanel.
   *
   * @param {string} id Name of the action to track.
   * @param {*} [action={}] Actions object with custom properties.
   * @memberof MixpanelService
   */
  track(id: string, action: any = {}): void {
    console.log(id,action);
    this.mixpanel.track(id, action).then((res)=>{console.log(res)})
  }
}
