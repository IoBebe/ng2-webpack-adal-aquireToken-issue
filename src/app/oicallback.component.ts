import {Component, OnInit} from '@angular/core';
import {AdalService} from "ng2-adal/services";
import {SecretService} from '../services/secret.service';
import {Router, NavigationExtras} from '@angular/router';

@Component({    
    selector: 'my-app',
    template: 'redirecting....',
})

export class OiCallbackComponent implements OnInit {
    public userName: string;

    constructor(
        private adalService: AdalService,
        private secretService: SecretService,
        private router: Router) {
            console.log("oicallback.component.ctor",this.isInIframe());
        }

    ngOnInit() { 
        console.log("oicallback.component.onInit" ,this.isInIframe());

        if (this.adalService.userInfo.isAuthenticated) {
            console.log("oicallback.component.onInit: IS authenticated",this.isInIframe());             
            
            if(this.router.url.includes("/oic")){
                console.log("oicallback.component.onInit: redirecting",this.isInIframe());  
                              
                return this.router.navigate(["/"],{
                    preserveQueryParams: false,
                    preserveFragment: false,
                    skipLocationChange: false,
                    replaceUrl: true
                }).then(r=>{
                    if(r===false){
                        console.log("oicallback.component.onInit: Coult not redirect back to home.",this.isInIframe());
                    }
                });
            }                        
        }
        else{
            console.log("oicallback.component.onInit: NOT authenticated",this.isInIframe());    
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