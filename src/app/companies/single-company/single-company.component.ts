import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/education/models/post.model';
import { Group } from 'src/app/shared/models/group.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/auth/user.model';
import { PostsService } from 'src/app/education/services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/posts/main-post/main-post.component';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.scss'],
})
export class SingleCompanyComponent implements OnInit {
  @Input() group: Group;
  @Input() post: Post;
  @Input() resource: string;
  @Input() type;
  user: User;
  comment = '';
  postBody;
  closeResult: string;
  isEmpty = true;
  editing = false;
  constructor(
    private modalService: NgbModal,
    private storage: StorageService,
    private postsService: PostsService,
    private deleteDialog: MatDialog
  ) {}

  ngOnInit(): void {
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
  onDeletePost() {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.postsService.deletePost(this.resource, this.post.id);
      }
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
