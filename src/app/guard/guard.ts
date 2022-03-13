import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "../services/core-service/session.service";

@Injectable({
    providedIn: 'root'
  })
export class Guard implements CanActivate {

    constructor(private router : Router, private session : SessionService){}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     
        if (!this.session.getUserId()) {
          // redirect to some view explaining what happened
          this.router.navigateByUrl('/login');
          return false;
          } 

          return true;

    }
}
