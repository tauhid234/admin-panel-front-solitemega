import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  // server : string = "http://api.solitemega.com/solite-api";

  server : string = "http://localhost:3000/solite-api";
  
  pasphrase = "SOLITEMEGA";

  isServerConfigLoaded : boolean = false;
  // t!: { (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; };
  t()
  {

  }

  constructor(private http : HttpClient,
    private router : Router) { }



  // public GotoSignIn(){
  //   this.removeAuthentication();
  //   this.router.navigate(['login'],{skipLocationChange : true});
  // }


  public getFormUrlEncoded(toConvert : any) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
}
