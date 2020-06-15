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
import { StudentComponent } from './auth/register/student/student.component';
import { CompanyComponent } from './auth/register/company/company.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostsComponent } from './posts/posts.component';
import {
  MainPostComponent,
  DeleteDialogComponent,
} from './posts/main-post/main-post.component';
import { GroupComponent } from './education/groups/group.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EmailVerificationComponent } from './auth/register/email-verification/email-verification.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './profile/update/update.component';
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
import { MatSelectModule } from '@angular/material/select';

import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { CommentComponent } from './posts/comment/comment.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SingleCommentComponent } from './posts/comment/single-comment/single-comment.component';

import { MatBadgeModule } from '@angular/material/badge';
import { SearchBarComponent } from './posts/search-bar/search-bar.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { ReplyComponent } from './posts/comment/reply/reply.component';
import { EventsComponent } from './events/events.component';
import { MatCardModule } from '@angular/material/card';
import { SingleEventComponent } from './events/single-event/single-event.component';
import { SingleReplyComponent } from './posts/comment/reply/single-reply/single-reply.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AnnouncementsComponent } from './education/announcements/announcements.component';
import { MatVideoModule } from 'mat-video';
import { SafePipe } from './shared/helpers/external-url.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { CompaniesComponent } from './companies/companies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ChatComponent } from './chat/chat.component';
import { SendFormComponent } from './chat/send-form/send-form.component';
import { FeedService } from './chat/services/feed.service';
import { ReceiversListComponent } from './chat/receivers-list/receivers-list.component';
import { ReceiverItemComponent } from './chat/receivers-list/receiver-item/receiver-item.component';
import { SendService } from './chat/services/send-service.service';
import { PhotoComponent } from './posts/photo/photo.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ImagesCarouselComponent } from './events/images/images.-carousel.component';
import { MatTableModule } from '@angular/material/table';

import { ToolsComponent } from './tools/tools.component';
import { AddToolComponent } from './tools/add-tool/add-tool.component';
import {
  ToolPostComponent,
  EditToolDialog,
  DeleteTool,
} from './tools/tool-post/tool-post.component';
import { ToolCommentsComponent } from './tools/tool-comments/tool-comments.component';
import { SingletoolCommentComponent } from './tools/tool-comments/singletool-comment/singletool-comment.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddAnnouncementComponent } from './education/announcements/add-announcement/add-announcement.component';

import { ToolReplyComponent } from './tools/tool-comments/singletool-comment/tool-reply/tool-reply.component';
import { ToolSingleReplyComponent } from './tools/tool-comments/singletool-comment/tool-reply/tool-single-reply/tool-single-reply.component';
import {
  QuestionsSectionComponent,
  AddQuestionDialog,
} from './questions-section/questions-section.component';
import { SingleQuestionComponent } from './questions-section/single-question/single-question.component';
import { AddCompanyEventComponent } from './companies/add-company-event/add-company-event.component';
import {
  QuestionDetailsComponent,
  EditQuestionDialog,
  DeleteQuestion,
} from './questions-section/question-details/question-details.component';
import { AnswerComponent } from './questions-section/question-details/answer/answer.component';
import { QuestionTagsComponent } from './questions-section/question-tags/question-tags.component';
import { SingleCompanyComponent } from './companies/single-company/single-company.component';
import { CoursesSectionComponent } from './courses-section/courses-section.component';
import { AddCourseComponent } from './courses-section/add-course/add-course.component';
import { MainCourseComponent } from './courses-section/main-course/main-course.component';
import { CourseCommentsComponent } from './courses-section/course-comments/course-comments.component';
import { CourseSinglecommentComponent } from './courses-section/course-comments/course-singlecomment/course-singlecomment.component';
import { CourseRepliesComponent } from './courses-section/course-comments/course-singlecomment/course-replies/course-replies.component';
import { CourseSinglereplyComponent } from './courses-section/course-comments/course-singlecomment/course-replies/course-singlereply/course-singlereply.component';
import { CoursePickerComponent } from './courses-section/course-picker/course-picker.component';
import { VerificationSuccessComponent } from './auth/register/verification-success/verification-success.component';
import { DashboardModule } from './dashboard/dashboard.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RegisterComponent,
    LoginComponent,
    SpinnerComponent,
    StudentComponent,
    CompanyComponent,
    HomeComponent,
    PostsComponent,
    MainPostComponent,
    GroupComponent,
    AddPostComponent,
    EmailVerificationComponent,
    ProfileComponent,
    UpdateComponent,
    NavComponent,
    NestedTreeComponent,
    CommentComponent,
    SingleCommentComponent,
    SearchBarComponent,
    SettingsComponent,
    ReplyComponent,
    EventsComponent,
    SingleEventComponent,
    SingleReplyComponent,
    SidebarComponent,
    AnnouncementsComponent,
    SafePipe,
    DeleteDialogComponent,
    CompaniesComponent,
    NotFoundComponent,
    ChatComponent,
    SendFormComponent,
    ReceiversListComponent,
    ReceiverItemComponent,
    ToolsComponent,
    AddToolComponent,
    ToolPostComponent,
    ToolCommentsComponent,
    SingletoolCommentComponent,
    EditToolDialog,
    DeleteTool,
    PhotoComponent,
    AddEventComponent,
    ImagesCarouselComponent,
    ToolsComponent,
    ToolReplyComponent,
    ToolSingleReplyComponent,
    QuestionsSectionComponent,
    SingleQuestionComponent,
    QuestionDetailsComponent,
    AddAnnouncementComponent,
    AddCompanyEventComponent,
    AnswerComponent,
    EditQuestionDialog,
    DeleteQuestion,
    AddQuestionDialog,
    QuestionTagsComponent,
    SingleCompanyComponent,
    CoursesSectionComponent,
    AddCourseComponent,
    MainCourseComponent,
    CourseCommentsComponent,
    CourseSinglecommentComponent,
    CourseRepliesComponent,
    CourseSinglereplyComponent,
    CoursePickerComponent,
    VerificationSuccessComponent,
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
    MatBadgeModule,
    MatCardModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    MatVideoModule,
    MatDialogModule,
    MatSelectModule,
    FileUploadModule,
    InputTextareaModule,
    SimpleNotificationsModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    DashboardModule,
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    FeedService,
    SendService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
