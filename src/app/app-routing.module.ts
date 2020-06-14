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
    canActivate: [AuthGuard],
  },

  {
    path: 'profile/update',
    component: UpdateComponent,
    canActivate: [AuthGuard],
  },
  
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'groups/:scope/:id',
    component: GroupComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: ['Student', 'Moderator', 'TeachingStaff'] },
  },
  {
    path: 'groups',
    component: GroupComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: ['Student', 'Moderator', 'TeachingStaff'] },
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: ['Student', 'Moderator', 'TeachingStaff'] },
  },
  {
    path: 'events/:scope/:id',
    component: EventsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: ['Student', 'Moderator', 'TeachingStaff'] },
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: ['Student', 'Moderator', 'TeachingStaff'] },
  },
  {
    path: 'announcements/:scope/:id',
    component: AnnouncementsComponent,
    canActivate: [AuthGuard, AuthorizedGuard],
    data: { roles: ['Student', 'Moderator', 'TeachingStaff'] },
  },
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
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
  },
  {
    path: 'messages',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard , AuthorizedGuard],
    runGuardsAndResolvers: 'always',
    data: { roles: ['Moderator', 'Admin'] },
    children: [
      { path: 'faculties', component: FacultiesComponent , canActivate:[AuthorizedGuard],data: { roles: [ 'Admin'] },},
      { path: 'universities', component: UniversitiesComponent },
      { path: 'departments', component: DepartmentsComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'tags', component: TagsComponent },
      { path: 'posts', component: AdminPostsComponent },
      { path: 'events', component: AdminEventsComponent },
      { path: 'questions', component: QuestionsComponent },
      { path: 'tools', component: AdminToolsComponent },
    ]
  },

  {
    path: 'tools',
    component: ToolsComponent,
    data: { type: '0' },
    canActivate: [AuthGuard]
  },

  {
    path: 'transportition',
    component: ToolsComponent,
    data: { type: '2' },
    canActivate: [AuthGuard]
  },

  {
    path: 'questions',
    component: QuestionsSectionComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'questions/:question',
    component: QuestionDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'company',
    component: SingleCompanyComponent,
    canActivate: [AuthGuard],
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
export class AppRoutingModule {}
