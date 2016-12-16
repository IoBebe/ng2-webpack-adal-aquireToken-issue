import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs';
import {AdalService} from "ng2-adal/services";
import {SecretService} from '../services/secret.service';
import {StuffService} from '../services/stuff.service';


@Component({
  selector: 'my-app',
  templateUrl: './stuff.component.html',
})
export class StuffComponent implements OnInit { 
  public stuffAsyncAquireToken : Observable<string[]>;
  public stuffAsyncNoAquireToken :Observable<string[]>
  public stuffSyncManualRefresh : string[];

  constructor(
        private adalService: AdalService,
        private secretService: SecretService,
        private stuffService: StuffService,        
        private ref:ChangeDetectorRef){         
  }

  ngOnInit(){
    if(this.adalService.userInfo.isAuthenticated){
      console.log('stuffComponent.onInit: IS Autenticated',this.isInIframe());

      this.stuffAsyncAquireToken    = this.stuffService.getWithAquireToken();
      this.stuffAsyncNoAquireToken  = this.stuffService.getWithouthAquireToken();
    

      this.stuffService.getWithAquireToken().subscribe((x)=>{
        console.log("stuffComponent.onInit: recieved stuff",this.isInIframe(), x);
        this.stuffSyncManualRefresh=x;

        console.log("stuffComponent.onInit: manual refresh",this.isInIframe());
        this.ref.detectChanges();
      });
    }
    else{
      console.log('stuffComponent.onInit: NOT Autenticated',this.isInIframe());
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
