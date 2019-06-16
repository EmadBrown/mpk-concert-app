import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SiteComponent } from './site.component';
import { BuyTicketsComponent } from './components/buy-tickets/buy-tickets.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { NgxLoginComponent } from './components/auth/login/login.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { SiteRoutingModule } from './site-routing.module'
import { ThemeModule } from './../@theme/theme.module';
import { AuthGuard } from './../auth-guard.service';
import { BalanceComponent } from './components/balance/balance.component';
import { DataService } from "./services/data.service";
import { ContactComponent } from './components/contact/contact.component';
import { NgbdModalComponent, NgbdModalContent } from './components/ngbdmodal/modal-component';

const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    success: true,
  },
};

@NgModule({
  declarations: [
    SiteComponent,
    BuyTicketsComponent,
    ConditionsComponent,
    NgxLoginComponent,
    BalanceComponent,
    ContactComponent,
    NgbdModalComponent,
    NgbdModalContent
  ],

  imports: [
    CommonModule,
    UiSwitchModule,
    SiteRoutingModule,
    ThemeModule.forRoot(),
  ],

  providers: [
    AuthGuard,
    DatePipe,
    DataService,
  ],

  exports: [NgbdModalComponent],
  // bootstrap: [NgbdModalComponent],
  entryComponents: [NgbdModalContent]

})
export class SiteModule { }
