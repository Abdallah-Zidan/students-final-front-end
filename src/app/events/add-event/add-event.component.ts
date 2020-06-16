import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Group } from 'src/app/shared/models/group.model';
import { User } from 'src/app/auth/user.model';
import { StorageService } from 'src/app/services/storage.service';
import { PostsService } from 'src/app/education/services/posts.service';
import { NotificationsService } from 'angular2-notifications';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  user: User;
  body: string;
  title: string;
  startDate: any;
  endDate: any;
  @Input() group: Group;
  @Input() resource: string;
  @Input() type: number;
  isEmpty = true;
  selectedFiles: File[] = [];
  addFile = false;
  addOrRemove = 'Add File(s)';
  closeResult: string;
  @ViewChild('form') formModal;
  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  constructor(
    private storage: StorageService,
    private postsService: PostsService,
    private service: NotificationsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
    if (this.group) {
      this.group.scope = (+this.group.scope - 1).toString();
    }
  }
  onAddPost() {
    this.filterFiles();
    const formData = new FormData();
    formData.append('body', this.body);
    formData.append('title', this.title);
    if (this.group) {
      formData.append('group', this.group.scope);
      formData.append('group_id', this.group.id);
    } else {
      formData.append('group', '2');
    }
    for (const file of this.selectedFiles) {
      formData.append('files[]', file);
    }

    formData.append('type', this.type.toString());
    formData.append(
      'start_date',
      `${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`
    );
    formData.append(
      'end_date',
      `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`
    );
    this.postsService.addPost(this.resource, formData).subscribe((res) => {
      if (res.data) {
        console.log(res);
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

  showModal(myModal) {
    this.modalService
      .open(myModal, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
        scrollable: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  filterFiles() {
    this.selectedFiles = this.selectedFiles.filter((file) => {
      return file.type.startsWith('image');
    });
  }
}
