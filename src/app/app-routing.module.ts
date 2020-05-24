import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/services/auth.guard';
import { RedirectGuard } from './auth/services/redirect.guard';
import { PublicComponentComponent } from './test/public-component/public-component.component';
import { ProtectedComponent } from './test/protected/protected.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
