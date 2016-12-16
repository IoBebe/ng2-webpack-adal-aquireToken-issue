import { AdalService } from "ng2-adal/services";
import { SecretService } from '../services/secret.service';
import { Injectable }  from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
        private adalService: AdalService,
        private secretService: SecretService) {
           
        }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean { 
    return this.checkLogin();
  }

  canLoad(route: Route): boolean {
    return this.checkLogin();
  }

  checkLogin(){
      if(this.adalService.userInfo.isAuthenticated){
          console.log('authGuard: IS authenticated -> allow route',this.isInIframe());
          return true;
      }
      else{
          console.log('authGuard: NOT authenticated -> deny route',this.isInIframe());
          this.adalService.login();
          return false;
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