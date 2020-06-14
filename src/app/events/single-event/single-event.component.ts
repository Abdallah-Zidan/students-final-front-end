import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { Group } from 'src/app/shared/models/group.model';
import { Post } from 'src/app/education/models/post.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss'],
})
export class SingleEventComponent implements OnInit {
  @Input() group: Group;
  @Input() post: Post;
  @Input() resource: string;
  @Input() type;
  user: User;
  comment = '';
  postBody;
  closeResult: string;
  defaultImageUrl = '../../../assets/images/default-event.jpg';
  constructor(
    private postsService: PostsService,
    private storage: StorageService,
    private modalService: NgbModal
  ) {}
  isEmpty = true;
  editing = false;
  ngOnInit() {
    this.postBody = this.post.body;
    this.user = this.storage.getUser('user');
  }
  onCommenting($event) {
    if ($event.target.value) {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }
  onAddComment(postId) {
    this.postsService.addComment(this.resource, this.comment, postId);
    setTimeout(() => {
      this.comment = '';
    }, 1500);
  }

  onEditPost() {
    this.editing = true;
  }
  onUpdatePost() {
    this.postsService
      .updatePost(
        this.resource,
        { body: this.postBody, title: 'default' },
        this.post.id
      )
      .subscribe((res) => {
        console.log(res);
        this.post.body = this.postBody;
        this.editing = false;
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
}
