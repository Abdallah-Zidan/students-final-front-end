import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  user: User;
  body = '';
  title: string;
  @Input() resource: string;
  @Input() type: number;
  isEmpty = true;
  selectedFiles: File[] = [];
  addFile = false;
  addOrRemove = 'Add File(s)';
  @Input() courseDepartment;

  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
  constructor(
    private storage: StorageService,
    private service: NotificationsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
   
  }

  onAddPost() {
    const formData = new FormData();
    formData.append('body', this.body);
    if (this.title) {
      formData.append('title', this.title);
    }
    
    for (const file of this.selectedFiles) {
      formData.append('files[]', file);
    }
    
    formData.append('course_department_faculty_id',this.courseDepartment)
    this.coursesService.addCourse(formData).subscribe((res) => {
      if (res.data) {
        this.body = '';
        this.title = '';
        this.selectedFiles = [];
        this.onSuccess();
        this.addFile = false;
        this.addOrRemove = 'Add File(s)';
        this.isEmpty = true;
      }
    });
  }

  add() {
    if (this.addFile) {
      this.addFile = false;
      this.addOrRemove = 'Add File(s)';
    } else {
      this.addFile = true;
      this.addOrRemove = 'Cancel';
    }
  }
  onSuccess() {
    this.service.info('Posted', 'your post has been submitted successfully', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: false,
      clickToClose: false,
      maxLength: 10,
    });
  }
}
