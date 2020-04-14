import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { GeolocationOptions, Geoposition, Geolocation } from '@ionic-native/geolocation/ngx';
import { google } from "google-maps";
import { UtilitiesService } from '../utilities.service';
import { Router } from '@angular/router';

 declare var google;

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.page.html',
  styleUrls: ['./map-page.page.scss'],
})
export class MapPagePage implements OnInit {

  @ViewChild('map', {static: false}) mapElement: ElementRef;
  options : GeolocationOptions;
 currentPos : Geoposition;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  address = '';

map: any;

geocoder = new google.maps.Geocoder();

  constructor(
    private geoLocation: Geolocation,
    public zone: NgZone,
    public utils: UtilitiesService,
    public router: Router
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService()
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
   }

  ngOnInit() {
    this.getUserPosition();
  }

  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();

}

addMarker(){

  let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: this.map.getCenter()
  });
  let content = "<p>This is your current position !</p>";          
  let infoWindow = new google.maps.InfoWindow({
  content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
  infoWindow.open(this.map, marker);
  });

}

updateSearchResults(){
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  (predictions, status) => {
    console.log("pre",predictions);
    this.autocompleteItems = [];
    this.zone.run(() => {
      predictions.forEach((prediction) => {
        this.autocompleteItems.push(prediction);
      });
    });
  });
}
selectSearchResult(item) {
  var  address;
  console.log(item)
  this.location = item
  this.placeid = this.location.place_id
  console.log('placeid'+ this.placeid)
  this.geocoder.geocode({ 
    'placeId': this.placeid
},(responses, status) => {
    if (status == 'OK') {
      responses.forEach((response) => {
        console.log("response",response);
       address = response.formatted_address;
});
        var lat = responses[0].geometry.location.lat();
        var lng = responses[0].geometry.location.lng();
        console.log(lat, lng);
    }
    console.log("add",address);
    this.utils.setAddress(address);
    console.log("addnew",this.utils.getAddressObservable());   
this.router.navigateByUrl('/schedule');
});
}

getUserPosition(){
  this.options = {
  enableHighAccuracy : false,
  timeout: 5000
  };
  this.geoLocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

      this.currentPos = pos;     

      console.log(pos);
      this.addMap(pos.coords.latitude,pos.coords.longitude);

  },(err : PositionError)=>{
      console.log("error : " + err.message);
  ;
  })
}
}
