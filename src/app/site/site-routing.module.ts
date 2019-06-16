import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SiteComponent } from './site.component';
import { BuyTicketsComponent } from './components/buy-tickets/buy-tickets.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgxLoginComponent } from './components/auth/login/login.component';
import { BalanceComponent } from './components/balance/balance.component';
import { AuthGuard } from './../auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: 'buyTickets', component: BuyTicketsComponent,
      },
      {
        path: 'conditions', component: ConditionsComponent,
      },
      {
        path: 'contact', component: ContactComponent,
      },
      {
        path: 'balance',
        component: BalanceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'login/admin',
        component: NgxLoginComponent,
      },

      { path: '', redirectTo: 'buyTickets', pathMatch: 'full' },
      { path: '**', redirectTo: 'buyTickets' },
    ]
    
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule { }
