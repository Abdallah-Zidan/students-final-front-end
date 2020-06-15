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
import { AnnouncementsComponent } from './education/announcements/announcements.component';
import { CompaniesComponent } from './companies/companies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorizedGuard } from './auth/services/authorized.guard';
import { UniversitiesComponent } from './admin/universities/universities.component';
import { FacultiesComponent } from './admin/faculties/faculties.component';
import { DepartmentsComponent } from './admin/departments/departments.component';
import { CoursesComponent } from './admin/courses/courses.component';
import { UsersComponent } from './admin/users/users.component';
import { TagsComponent } from './admin/tags/tags.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { AdminEventsComponent } from './admin/admin-events/admin-events.component';
import { from } from 'rxjs';
import { QuestionsComponent } from './admin/questions/questions.component';
import { AdminToolsComponent } from './admin/admin-tools/admin-tools.component';
import { ToolsComponent } from './tools/tools.component';

import { QuestionsSectionComponent } from './questions-section/questions-section.component';
import { QuestionDetailsComponent } from './questions-section/question-details/question-details.component';
import { SingleCompanyComponent } from './companies/single-company/single-company.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectGuard],
    data: { depth: 1 }
  },
  {
    path: '',
    component: HomeComponent,
    data: { depth: 2 }

  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectGuard],
    data: { depth: 3 }

  },

  {
    path: 'email/verify',
    component: EmailVerificationComponent,
    canActivate: [RedirectGuard],
    data: { depth: 4 }
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { depth: 5 }
  },

  {
    path: 'profile/update',
    component: UpdateComponent,
    canActivate: [AuthGuard],
    data: { depth: 6 }
  },

  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { depth: 7 }
  },

  {
    path: 'settings',
    component: SettingsComponent,
    data: { depth: 8 }
  },
  {
    path: 'groups/:scope/:id',
    component: GroupComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: [1, 2, 3]},
  },
  {
    path: 'groups',
    component: GroupComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: [1,2,3] },
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: [1,2,3]},
  },
  {
    path: 'events/:scope/:id',
    component: EventsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: [1,2,3,4]},
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: [1,2,3]},
  },
  {
    path: 'announcements/:scope/:id',
    component: AnnouncementsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: [1,2,3] },
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
    data: { depth: 15 }
  },
  {
    path: 'companies/:type/:scope/:id',
    component: CompaniesComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'messages/:id',
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: { depth: 17 }
  },
  {
    path: 'messages',
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: { depth: 18 }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    runGuardsAndResolvers: 'always',
    data: { roles: [0, 3] , depth: 19 },
    children: [
      { path: 'faculties', component: FacultiesComponent, canActivate: [AuthorizedGuard], data: { roles: ['Admin'] }, },
      { path: 'universities', component: UniversitiesComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'posts', component: AdminPostsComponent },
      { path: 'events', component: AdminEventsComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'tools', component: AdminToolsComponent },
    ],
  },

  {
    path: 'tools',
    component: ToolsComponent,
    data: { type: '0' , depth: 20 },
    canActivate: [AuthGuard],
  },

  {
    path: 'transportition',
    component: ToolsComponent,
    data: { type: '2', depth: 21 },
    canActivate: [AuthGuard],
  },

  {
    path: 'questions',
    component: QuestionsSectionComponent,
    canActivate: [AuthGuard],
    data: { depth: 22 }
  },

  {
    path: 'questions/:question',
    component: QuestionDetailsComponent,
    canActivate: [AuthGuard],
    data: { depth: 23 }
  },
  {
    path: 'company',
    component: SingleCompanyComponent,
    canActivate: [AuthGuard],
    data: { depth: 24 }
  },
  {
    path: '**',
    component: NotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
