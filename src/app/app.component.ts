import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AdalService} from "ng2-adal/services";
import {SecretService} from '../services/secret.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit { 
  public userName : string = '(no user)';

  constructor(
        private adalService: AdalService,
        private secretService: SecretService){    
           this.adalService.init(this.secretService.adalConfig);
            this.adalService.handleWindowCallback();     
  }

  ngOnInit(){
    if(this.adalService.userInfo.isAuthenticated){
      console.log('AppComponent.onInit: IS Autenticated',this.isInIframe());
      this.userName = this.adalService.userInfo.userName;     
    }
    else{
      console.log('AppComponent.onInit: NOT Autenticated',this.isInIframe());
      this.userName = 'not authenticated yet';
    }
  }

   isInIframe () {
      try {
          let iframe:boolean = window.self !== window.top;
          return "| IFRAME: "+iframe;
      } catch (e) {
          return "| IFRAME: true";
      }
  }
}
