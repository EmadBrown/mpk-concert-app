import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthJWTToken } from '@nebular/auth';



@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})

export class NgxLoginComponent extends NbLoginComponent implements OnInit {

  isAdmin: boolean = false;

  ngOnInit() {
    this.isAdmin = this.router.url === '/home/login/admin'? true : false;
    this.service.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        // this.data.checkAuthentication(token.getPayload()['data']);
        if (token.getPayload()['data'].role == 'admin') {
          this.router.navigateByUrl('pages'); 
        }
        else {
          this.router.navigateByUrl('home'); // Your redirection goes here
        }
      }
    });
  }
}
