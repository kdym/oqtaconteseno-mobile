import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userAvatar;
  public userName;

  constructor(public nav: NavController, public navParams: NavParams, public auth: AuthProvider) {
    this.userAvatar = this.auth.loggedUser().avatar;
    this.userName = this.auth.loggedUser().name;

  }

  logout() {
    this.auth.logout().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

}
