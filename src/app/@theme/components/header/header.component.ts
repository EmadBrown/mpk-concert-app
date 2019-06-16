import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { Router } from '@angular/router'
import { filter, map } from 'rxjs/operators';
import { AuthGuard } from './../../../auth-guard.service';
import { NbAccessChecker, NbRoleProvider, NbAclService } from '@nebular/security';
import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth';



@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private router: Router,
    private nbMenuService: NbMenuService,
    private authService: NbAuthService,
    public accessChecker: NbAccessChecker,
    public role: NbRoleProvider,
    public current: NbAclService,
    private authGurad: AuthGuard,
    private nbTokenService: NbTokenService) {
  }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload()['data']; // here we receive a payload from the token and assigne it to our `user` variable 
        }
      });

    //Logout & redirect to home page
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == 'Log out') {
          this.nbTokenService.clear();
          this.router.navigateByUrl('login');
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
