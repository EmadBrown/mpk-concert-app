import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken, NbTokenService } from '@nebular/auth'
import { Router } from '@angular/router';
import { NbAccessChecker, NbAclService } from '@nebular/security';
import { AuthGuard } from './../auth-guard.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'ngx-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
})

export class SiteComponent implements OnInit {
  user: any;
  totalTicket: number = 3;
  ticketPrice: number = 500;
  checkAuth: boolean = false;
  userRole: string = 'guest'

  userMenu = [{ title: 'Profile' }];

  constructor(
    public accessChecker: NbAccessChecker,
    public current: NbAclService,
    private authService: NbAuthService,
    private router: Router,
    private authGurad: AuthGuard,
    private getData: DataService,
    private nbTokenService: NbTokenService,
  ) { }

  ngOnInit() {
    this.authGurad.canActivate().subscribe(canActivate => {
      this.checkAuth = canActivate;
    });
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload()['data']; // here we receive a payload from the token and assigne it to our `user` variable 
          this.userRole = token.getPayload()['data'].role;
          this.user.token = token.getValue();
          this.newData(this.user);
          this.checkAuth = true;

          if (token.getPayload()['data'].role == 'admin') {
            this.router.navigateByUrl('pages');
          }
          else
            this.router.navigateByUrl('home/balance'); // Your redirection goes here
        }
        else {
          this.newData(null);
          this.checkAuth = false;
        }
      });
  }

  newData(data: any) {
    this.getData.checkAuthentication(data)
  }

  logout() {
    this.nbTokenService.clear();
    this.ngOnInit()
  }
}
