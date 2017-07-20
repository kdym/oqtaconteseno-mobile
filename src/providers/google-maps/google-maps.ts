import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Geolocation} from "@ionic-native/geolocation";

declare let google;

/*
 Generated class for the GoogleMapsProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GoogleMapsProvider {

  public map: any;
  public positionMarker: any;

  DEFAULT_ZOOM = 15;

  constructor(public geolocation: Geolocation) {

  }

  loadMapAtMyPosition(containerId) {
    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then(position => {
        this.loadMap(position.coords.latitude, position.coords.longitude, containerId);

        this.positionMarker = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map: this.map,
          icon: '../assets/img/position_marker.png'
        });

        resolve(this.map);
      }, error => {
        console.log(error.message);
      });
    });
  }

  loadMap(latitude, longitude, containerId) {
    this.map = new google.maps.Map(document.getElementById(containerId), {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: this.DEFAULT_ZOOM,
      mapTypeControl: false,
      streetViewControl: false
    });
  }

  addMyLocationButton(map) {
    let controlDiv = document.createElement('div');

    let firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0px';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    let secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0px 0px';
    secondChild.style.backgroundRepeat = 'no-repeat';
    secondChild.id = 'you_location_img';
    firstChild.appendChild(secondChild);

    firstChild.addEventListener('click', () => {
      this.geolocation.getCurrentPosition().then(position => {
        this.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

        this.positionMarker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      });
    });

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }

  //
  // loadMap(containerId) {
  //   let config = {
  //     desiredAccuracy: 0,
  //     stationaryRadius: 20,
  //     distanceFilter: 10,
  //     debug: true,
  //     interval: 2000
  //   };
  //
  //   this.backgroundGeolocation.configure(config).subscribe(location => {
  //     // this.map = new google.maps.Map(document.getElementById(containerId), {
  //     //   center: new google.maps.LatLng(location.latitude, location.longitude),
  //     //   zoom: 15
  //     // });
  //     console.log(location.latitude);
  //     console.log(location.longitude);
  //   });
  //
  //   // this.backgroundGeolocation.start();
  //   //
  //   // let options = {
  //   //   frequency: 3000,
  //   //   enableHighAccuracy: true
  //   // };
  //   //
  //   // this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
  //   //   this.latitude = position.coords.latitude;
  //   //   this.longitude = position.coords.longitude;
  //   // });
  // }
  //
  // stopTrackingPosition() {
  //   this.backgroundGeolocation.finish();
  //   this.watch.unsubscribe();
  // }

}
