import { Component, OnInit } from '@angular/core';
import { CoursesService } from './services/courses.service';
import { Course } from './models/course';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-courses-section',
  templateUrl: './courses-section.component.html',
  styleUrls: ['./courses-section.component.scss'],
})
export class CoursesSectionComponent implements OnInit {
  courses: Array<Course>;
  resource = 'coursePosts';
  departmentFilter;
  currentUser:User
  constructor(
    private courseService: CoursesService,
    private activeRoute: ActivatedRoute,
    private storageService :StorageService
  ) {
    this.courseService.coursesSubject.subscribe((courses) => {
      this.courses = courses;
    });
    this.currentUser = this.storageService.getUser('user');
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((map) => {
      this.departmentFilter = map['id'];
      this.courseService.getCoursesPosts(this.departmentFilter);
    });
  }
}
