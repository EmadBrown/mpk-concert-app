/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { FormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './site/http-error.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './auth-guard.service';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthModule } from '@nebular/auth';
import { RoleProvider } from './role.provider'

@NgModule({
  declarations: [
    AppComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    HttpClientModule,
    FormsModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),

    NbSecurityModule.forRoot(
      {
        accessControl: {
          guest: {
            view: 'news',
          },
          user: {
            parent: 'guest',
            create: 'comments'
          },
          admin: {
            parent: 'user',
            view: 'admin',
          },
        },
      }
    ),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          // name: 'username',

          token: {
            class: NbAuthJWTToken,
            key: 'jwt', // this parameter tells where to look for the token
          },

          baseEndpoint: 'http://i410456.hera.fhict.nl/api/',

          login: {
            endpoint: 'login.php',
            method: 'post',
          },
          register: {
            endpoint: 'register.php',
            method: 'post',
            redirect: {
              success: 'home',
              failure: null,
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        register: {
          redirectDelay: 'home',
          showMessages: {
            success: true,
          },
        },
        logout: {
          redirectDelay: 0,
          strategy: 'username',
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '/' },

    AuthGuard,
    {
      provide: NbRoleProvider,
      useClass: RoleProvider,

    },

  ],
})
export class AppModule {
}
