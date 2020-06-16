import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { Group } from 'src/app/shared/models/group.model';
import { StorageService } from 'src/app/services/storage.service';
import { PostsService } from 'src/app/education/services/posts.service';
import { NotificationsService } from 'angular2-notifications';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-company-event',
  templateUrl: './add-company-event.component.html',
  styleUrls: ['./add-company-event.component.scss'],
})
export class AddCompanyEventComponent implements OnInit, OnDestroy {
  user: User;
  body: string;
  title: string;
  @Input() resource: string;
  @Input() type: number;
  isEmpty = true;
  selectedFiles: File[] = [];
  addFile = false;
  addOrRemove = 'Add File(s)';
  closeResult: string;
  @ViewChild('form') formModal;
  universities: any[] = [];
  currentUniversity = null;
  currentFaculty = null;
  faculties: any[] = [];
  subscription: Subscription;
  tipo = {
    1: 'training',
    2: 'internship',
    4: 'job offer',
  };
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
    private modalService: NgbModal,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.user = this.storage.getUser('user');
    this.subscription = this.httpService.getUniversites().subscribe((res) => {
      this.universities = res.data.universities;
    });
  }
  onAddPost() {
    this.filterFiles();
    let scope;
    let id;
    const formData = new FormData();
    formData.append('body', this.body);
    if (this.title) {
      formData.append('title', this.title);
    }
    if (this.currentUniversity) {
      if (this.currentFaculty) {
        scope = '0';
        id = this.currentFaculty.id;
      } else {
        scope = '1';
        id = this.currentUniversity.id;
      }
      formData.append('group', scope);
      formData.append('group_id', id);
    } else {
      formData.append('group', '2');
    }
    for (const file of this.selectedFiles) {
      formData.append('files[]', file);
    }

    formData.append('type', this.type.toString());

    this.postsService.addPost(this.resource, formData).subscribe((res) => {
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
  onChangeUniversity(event) {
    const index = +event.target.value;
    if (index !== -1) {
      this.currentUniversity = this.universities[index];
      this.faculties = this.currentUniversity.faculties;
    } else {
      this.currentUniversity = null;
      this.faculties = [];
    }
  }
  onChangeFaculty(event) {
    const index = event.target.value;
    if (index !== -1) {
      if (this.currentUniversity) {
        this.currentFaculty = this.currentUniversity.faculties[index];
      }
    }
  }
  filterFiles() {
    this.selectedFiles = this.selectedFiles.filter((file) => {
      return file.type.startsWith('image');
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
