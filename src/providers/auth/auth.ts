import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {FacebookAuth, User} from "@ionic/cloud-angular";
import {DebugServerProvider} from "../debug-server/debug-server";
import {UserProvider} from "../user/user";
import {LoadingController} from "ionic-angular";

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthProvider {

  constructor(public user: User,
              public facebook: FacebookAuth,
              public userProvider: UserProvider,
              public loading: LoadingController,
              public debugServer: DebugServerProvider) {

  }

  isLoggedIn() {
    if (this.debugServer.isDebugServer()) {
      return true;
    } else {
      return this.user.social.facebook != null;
    }
  }

  login() {
    return new Promise(resolve => {
      if (this.debugServer.isDebugServer()) {
        resolve(this);
      } else {
        this.facebook.login().then(() => {
          let loader = this.loading.create({
            content: '',
          });

          loader.present();

          let userData = {
            email: this.user.social.facebook.data.email,
            uid: this.user.social.facebook.uid,
            name: this.user.social.facebook.data.full_name,
            image: this.user.social.facebook.data.profile_picture
          };

          this.userProvider.setUser(userData).then(data => {
            this.user.set('user_id', data['id']);

            resolve(this);

            loader.dismiss();
          });
        }, error => {

        });
      }
    });
  }

  logout() {
    return new Promise(resolve => {
      if (this.debugServer.isDebugServer()) {
        resolve(this);
      } else {
        this.facebook.logout().then(() => {
          resolve(this);
        });
      }
    });
  }

  loggedUser() {
    if (this.debugServer.isDebugServer()) {
      return {
        id: 1,
        name: 'sKn Metal',
        avatar: 'assets/img/me.jpeg'
      };
    } else {
      return {
        id: this.user.get('user_id', 0),
        name: this.user.social.facebook.data.full_name,
        avatar: this.user.social.facebook.data.profile_picture
      };
    }
  }

}
