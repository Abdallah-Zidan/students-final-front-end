import { Component, OnInit, Input } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-picker',
  templateUrl: './course-picker.component.html',
  styleUrls: ['./course-picker.component.scss'],
})
export class CoursePickerComponent implements OnInit {
  public courses: Array<any>;
  @Input() courseDepartment;
  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((res) => {
      this.courses = res.data.courses;
    });
  }
}
