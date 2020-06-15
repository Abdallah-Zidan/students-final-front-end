import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { TutorialService } from '../models/services/tutorial.service';
import { User } from 'src/app/auth/user.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss'],
})
export class AddTutorialComponent implements OnInit {
  user: User;
  body = '';
  @Input() resource: string;
  @Input() type: number;
  tags = [];
  selectedTags = [];
  isEmpty = true;
  selectedFiles: File[] = [];
  addFile = false;
  addOrRemove = 'Add File(s)';
  @Input() courseDepartment;
  newTag;

  constructor(
    private storage: StorageService,
    private service: NotificationsService,
    private tutorialService: TutorialService
  ) {}
  onCommenting($event) {
    if (this.body && this.selectedTags.length) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
    // console.log('asdsad');
    // if ($event.target.value && this.selectedTags.length) {
    //   this.isEmpty = false;
    // } else {
    //   this.isEmpty = true;
    // }
  }

  onSelecting(event) {
    if (this.body && this.selectedTags.length) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
    this.tutorialService.getTags().subscribe((res) => {
      this.tags = res.data.tags;
    });
  }

  onAddPost() {
    const formData = new FormData();
    formData.append('body', this.body);
    this.selectedTags.forEach((tag) => {
      formData.append('tags[]', tag);
    });
    for (const file of this.selectedFiles) {
      formData.append('files[]', file);
    }

    formData.append('course_department_faculty_id', this.courseDepartment);
    this.tutorialService.addCourse(formData).subscribe((res) => {
      if (res.data) {
        this.body = '';
        this.selectedFiles = [];
        this.onSuccess();
        this.addFile = false;
        this.addOrRemove = 'Add File(s)';
        this.isEmpty = true;
        this.selectedTags = [];
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

  displayTagInput() {
    let add_input = document.getElementById('TagInput');

    if (add_input.style.display === 'none') {
      add_input.style.display = 'block';
    } else {
      this.newTag = null;
      add_input.style.display = 'none';
    }
  }

  addNewTag() {
    let found;
    if (this.newTag) {
      found = this.tags.find((x) => x.name == this.newTag);
      if (!found) {
        this.tags.push({ name: this.newTag });
      }
      this.selectedTags = this.selectedTags || [];
      this.selectedTags.push(this.newTag);
    }
    this.displayTagInput();
  }
}
