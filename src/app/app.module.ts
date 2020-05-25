import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule , ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';
import { SpinnerComponent } from './auth/spinner/spinner.component';
import { PublicComponentComponent } from './test/public-component/public-component.component';
import { ProtectedComponent } from './test/protected/protected.component';
import { StudentComponent } from './register/student/student.component';
import { CompanyComponent } from './register/company/company.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './posts/posts.component';
import { LeftSidebarComponent } from './posts/left-sidebar/left-sidebar.component';
import { MainPostComponent } from './posts/main-post/main-post.component';
import { RightSidebarComponent } from './posts/right-sidebar/right-sidebar.component';


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
    RightSidebarComponent,
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
    NgbModule
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
export class AppModule {}
