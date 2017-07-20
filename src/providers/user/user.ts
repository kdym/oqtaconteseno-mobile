import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalConstantsProvider} from "../global-constants/global-constants";

/*
 Generated class for the UserProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserProvider {

  constructor(public http: Http, public globalConstants: GlobalConstantsProvider) {

  }

  setUser(user) {
    return new Promise(resolve => {
      let data = new FormData();

      data.append('email', user.email);
      data.append('uid', user.uid);
      data.append('name', user.name);
      data.append('image', user.image);

      this.http.post(this.globalConstants.API_ENDPOINT + 'app_login.json', data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log(error.toString());
        });
    });
  }

}
