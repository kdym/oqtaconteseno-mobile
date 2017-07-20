import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

/*
 Generated class for the GlobalConstantsProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GlobalConstantsProvider {
  public API_ENDPOINT = 'http://192.168.25.5:3000/';

  constructor() {

  }

}
