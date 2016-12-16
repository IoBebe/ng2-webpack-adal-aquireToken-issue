import {Injectable} from '@angular/core';


@Injectable()
export class SecretService {

    private settings:any ={
        instance: 'https://login.microsoftonline.com/',
        tenant: '[Azure AD Tenant GUID]',
        clientId: '[Azure AD Client Id]',
        redirectUri: window.location.origin + "/oic",
        postLogoutRedirectUri: window.location.origin + "/oic"
    };

    public get adalConfig(): any {
        return this.settings;
    }

    public get apiClientId(){
        return this.settings.clientId;
    }
}