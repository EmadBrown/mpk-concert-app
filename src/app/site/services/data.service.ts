import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NbAuthService, NbAuthJWTToken, NbTokenService } from '@nebular/auth'
import { Router } from '@angular/router';
import { NbAccessChecker, NbAclService } from '@nebular/security';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private user = new BehaviorSubject<any>(null);
  currentUser = this.user.asObservable();

  constructor() { }

  checkAuthentication(user: any) {
    this.user.next(user);
  }
}
