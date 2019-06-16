import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap, map, first } from 'rxjs/operators';
import { RoleProvider } from './role.provider';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  role: string = 'guest';
  user: any;
  expectedRole: string = 'guest' ;

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private roleProvider: RoleProvider
  ) {
  }

  getDataFirstChild(firstChild: any): string {
    if (firstChild != null && firstChild.data.expectedRole == null) {
      this.getDataFirstChild(firstChild.firstChild);
    }
    if(firstChild.data.expectedRole != null){
      this.expectedRole = firstChild.data.expectedRole;
    }
    return 'done';
  }

  canActivate(): Observable<boolean> {
    // this will be passed from the route config
    // on the data property
    
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['home']);
          }
        }),
      );
  }
}


