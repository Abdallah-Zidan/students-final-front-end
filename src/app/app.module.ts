import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './auth/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { SpinnerComponent } from './auth/spinner/spinner.component';
import { PublicComponentComponent } from './test/public-component/public-component.component';
import { ProtectedComponent } from './test/protected/protected.component';
import { StudentComponent } from './auth/register/student/student.component';
import { CompanyComponent } from './auth/register/company/company.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './posts/posts.component';
import { LeftSidebarComponent } from './posts/left-sidebar/left-sidebar.component';
import { MainPostComponent } from './posts/main-post/main-post.component';
import { GroupComponent } from './education/group/group.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { SidebarModule } from 'ng-sidebar';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './nav/nav.component';
import { NestedTreeComponent } from './nested-tree/nested-tree.component';
import { MatTreeModule } from '@angular/material/tree';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { CommentComponent } from './posts/comment/comment.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SingleCommentComponent } from './posts/comment/single-comment/single-comment.component';

import {MatBadgeModule} from '@angular/material/badge';
import { SearchBarComponent } from './posts/search-bar/search-bar.component';
import { ReplyComponent } from './posts/comment/reply/reply.component';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    SpinnerComponent,
    PublicComponentComponent,
    ProtectedComponent,
    StudentComponent,
    CompanyComponent,
    HomeComponent,
    PostsComponent,
    LeftSidebarComponent,
    MainPostComponent,
    GroupComponent,
    AddPostComponent,
    NavComponent,
    NestedTreeComponent,
    CommentComponent,
    SingleCommentComponent,
    SearchBarComponent,
    ReplyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    SidebarModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatTreeModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatExpansionModule,
    MatBadgeModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
