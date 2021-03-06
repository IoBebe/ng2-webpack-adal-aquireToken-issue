import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule }  from '@angular/http';
import { RouterModule, Routes  } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AdalService } from "ng2-adal/services";
import { SecretService } from '../services/secret.service';
import { OiCallbackComponent } from './oicallback.component';
import { StuffComponent } from './stuff.component';
import { AuthGuard } from './AuthGuard';
import { StuffService } from '../services/stuff.service';

const appRoutes: Routes = [   
  {
    path: '',
    component: StuffComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'oic',
    component: OiCallbackComponent,
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: true, enableTracing: false })
  ],
  declarations: [
    AppComponent,
    OiCallbackComponent,
    StuffComponent
  ],
  providers: [ SecretService, AdalService, AuthGuard, StuffService ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
