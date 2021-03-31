import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkdetectService {

  networkSwitch = new BehaviorSubject<boolean>(true);

  constructor(private network: Network) {


  }

  networkDisconnect(){
    this.network.onDisconnect().subscribe(() => {
      this.networkSwitch.next(false);
      // netSwitch= this.networkSwitch;
    });
  }

  networkConnect(){
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.networkSwitch.next(true);
      // netSwitch = this.networkSwitch;
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
        }
      }, 3000);
    });
  }
}
