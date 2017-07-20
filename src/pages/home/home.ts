import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {User} from "@ionic/cloud-angular";
import {GoogleMapsProvider} from "../../providers/google-maps/google-maps";
import {AddEventPage} from "../add-event/add-event";

declare let google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public map: any;
  public addEventWindow: any;

  constructor(public nav: NavController,
              public user: User,
              public googleMaps: GoogleMapsProvider) {

  }

  ionViewDidLoad() {
    this.addEventWindow = new google.maps.InfoWindow({
      content: document.getElementById('info-window-content')
    });

    this.googleMaps.loadMapAtMyPosition('map').then(map => {
      this.map = map;

      this.googleMaps.addMyLocationButton(this.map);

      this.map.addListener('click', event => {
        this.callInfoWindow(event.latLng);
      });

      this.googleMaps.positionMarker.addListener('click', event => {
        this.callInfoWindow(event.latLng);
      });
    });
  }

  profileClick() {
    this.nav.push(ProfilePage);
  }

  addEvent() {
    this.nav.push(AddEventPage);
  }

  callInfoWindow(position) {
    this.addEventWindow.close();
    this.addEventWindow.setPosition(position);
    this.addEventWindow.open(this.map);
  }

}
