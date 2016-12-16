import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs';
import {AdalService} from "ng2-adal/services";
import {SecretService} from '../services/secret.service';


@Injectable()
export class StuffService {
  
  constructor (@Inject(Http) private http: Http, 
              private adalService: AdalService,
              private secretService: SecretService){ 
              }

  getWithAquireToken (): Observable<string[]> {        
    console.log("stuffService.get",this.isInIframe());
   
    return this.adalService
    .acquireToken(this.secretService.apiClientId)
    .catch((error:any)=>{
      console.error("stuffService.get: could not fetch token:",this.isInIframe(), error);
      return this.handleError(error);
    })
    .flatMap((tokenResponse)=>{
      let accessToken = tokenResponse.toString();
      console.log("stuffService.get: fetched token",this.isInIframe());

      return new Observable<string[]>(        
        (sub:any) =>{
          console.log("stuffService.get: start async call",this.isInIframe());            
          setTimeout(()=>{
            console.log("stuffService.get: end async call",this.isInIframe());    
            sub.next(["aaaa", "bbbbb", "ccccc"]);
          }, 1000);
        }
      );    
    }); 
  }

  getWithouthAquireToken():Observable<string[]>{
      return new Observable<string[]>(        
        (sub:any) =>{
          console.log("stuffService.get: start async call",this.isInIframe());            
          setTimeout(()=>{
            console.log("stuffService.get: end async call",this.isInIframe());    
            sub.next(["aaaa", "bbbbb", "ccccc"]);
          }, 1000);
        }
      ); 
  }

  private handleError (error: Response | any) {
    console.log("stuffService.handleError",this.isInIframe(), error);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
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

