import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './auth/spinner/spinner.component';

import { PublicComponentComponent } from './test/public-component/public-component.component';
import { ProtectedComponent } from './test/protected/protected.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SpinnerComponent,
    PublicComponentComponent,
    ProtectedComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule,HttpClientModule,],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
