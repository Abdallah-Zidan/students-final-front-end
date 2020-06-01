import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/services/auth.guard';
import { RedirectGuard } from './auth/services/redirect.guard';
import { HomeComponent } from './home/home.component';
import { EmailVerificationComponent } from './auth/register/email-verification/email-verification.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './profile/update/update.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { GroupComponent } from './education/groups/group.component';
import { EventsComponent } from './events/events.component';
import { SingleEventComponent } from './events/single-event/single-event.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectGuard],
  },

  {
    path: 'email/verify',
    component: EmailVerificationComponent,
    canActivate: [RedirectGuard],
  },

  {
    path: 'profile',
    component: ProfileComponent,
  },

  {
    path: 'profile/update',
    component: UpdateComponent,
  },

  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'groups/:id',
    component: GroupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'groups',
    component: GroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events/:id',
    component: SingleEventComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
