import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../models/post.model';

@Component({
	selector: 'app-show-dialog',
	templateUrl: './show-dialog.component.html',
	styleUrls: ['./show-dialog.component.scss']
})
export class ShowDialogComponent implements OnInit {
	post: Post;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.post = data.post
	}

	ngOnInit(): void { }
}