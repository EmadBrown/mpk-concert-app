import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth'
import { DashboardService } from './dashboard.service'
import { DataService } from "./data.service";
import { MENU_ITEMS } from './pages-menu';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  user: any;
  data: any;
  constructor(
    private dashboardService: DashboardService,
    private authService: NbAuthService,
    private getData: DataService,
    private router: Router
  ) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      // user should auth and role of admin to access
      if (token.isValid() && token.getPayload()['data'].role == 'admin') {
        this.user = token.getPayload()['data']; // here we receive a payload from the token and assigne it to our `user` variable 
        this.user.token = token.getValue();
        this.dashboardService.getAllVisitors(this.user.token).subscribe(data => { this.newData(data) });
      }else{
        this.router.navigate(["home"]); 
      }
    });
  }

  ngOnInit() {
  }

  newData(data: any) {
    this.getData.changeData(data)
  }
}