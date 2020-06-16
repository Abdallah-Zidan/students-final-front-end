import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostService } from './services/post.service';
import { Post } from './models/post.model';
import { ShowDialogComponent } from './components/show-dialog/show-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	displayedColumns = ['body', 'user', 'reported', 'scope', 'options'];
	length: number;
	pageSize: number;
	pageSizeOptions = [5, 10, 25, 100];
	dataSource: MatTableDataSource<Post>;
	dialogRef: MatDialogRef<any, any>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private postService: PostService, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<Post>();
		this.dataSource.paginator = this.paginator;
		this.getPosts(this.pageSizeOptions[1], 1);
	}

	getPosts(items: number, page: number) {
		this.postService.getPosts(items, page).subscribe((data: any) => {
			this.length = data.length;
			this.pageSize = data.pageSize;
			this.dataSource = new MatTableDataSource<Post>(data.posts);
		});
	}

	onDeleteSubmit(id: number) {
		this.postService.deletePost(id).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === id);
			this.dataSource.data.splice(index, 1);
			this.dataSource = new MatTableDataSource<Post>(this.dataSource.data);
			this.length--;
			this.dialogRef.close();
		});
	}

	onPageChanged(event) {
		this.getPosts(event.pageSize, +event.pageIndex + 1);
	}

	openShowDialog(post: Post) {
		this.dialogRef = this.dialog.open(ShowDialogComponent, {
			data: {
				post: post
			}
		});
	}

	openDeleteDialog(post: Post) {
		this.dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {
				title: 'post',
				name: post.body.length > 25 ? post.body.slice(0, 25) + '...' : post.body,
				id: post.id
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((id: number) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDeleteSubmit(id)
		});
	}
}