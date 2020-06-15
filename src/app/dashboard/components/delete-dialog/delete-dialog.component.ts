import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-delete-dialog',
	templateUrl: './delete-dialog.component.html',
	styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
	title: string;
	name: string;
	id: number;
	onSubmitd = new EventEmitter();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
		this.title = data.title;
		this.name = data.name;
		this.id = data.id
	}

	ngOnInit(): void { }

	onSubmit(event) {
		this.isBusy = true;
		this.onSubmitd.emit(this.id);
	}
}