import { Component, OnInit } from '@angular/core';
import { CoursesService } from './services/courses.service';
import { Course } from './models/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses-section',
  templateUrl: './courses-section.component.html',
  styleUrls: ['./courses-section.component.scss'],
})
export class CoursesSectionComponent implements OnInit {
  courses: Array<Course>;
  resource = "coursePosts"
  departmentFilter;
  constructor(private courseService: CoursesService , private activeRoute :ActivatedRoute) {
    this.courseService.coursesSubject.subscribe((courses) => {
      this.courses = courses;
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((map) => {
      this.departmentFilter = map['id'];
      this.courseService.getCoursesPosts(this.departmentFilter);
    });
  }
}
