import { ExtraOptions, RouterModule, Routes, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth-guard.service';
import { SiteModule } from './site/site.module';
import { PagesModule } from '../app/pages/pages.module';

const routes: Routes = [
  {
    path: 'home', loadChildren: () => SiteModule,
  },

  {
    path: 'pages', loadChildren: () => PagesModule,
    canActivate: [AuthGuard],
  },

  {
    path: 'pages/dashboard', redirectTo: 'pages'
  },

  {
    path: 'login', redirectTo: 'home/login',
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
