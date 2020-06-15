import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UniversityService } from './services/university.service';
import { University } from './models/university.model';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { ShowDialogComponent } from './components/show-dialog/show-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-university',
	templateUrl: './university.component.html',
	styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
	displayedColumns = ['id', 'name', 'options'];
	length: number;
	pageSize: number;
	pageSizeOptions = [5, 10, 25, 100];
	dataSource: MatTableDataSource<University>;
	dialogRef: MatDialogRef<any, any>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private universityService: UniversityService, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<University>();
		this.dataSource.paginator = this.paginator;
		this.getUniversities(this.pageSizeOptions[1], 1);
	}

	getUniversities(items: number, page: number) {
		this.universityService.getUniversities(items, page).subscribe((data: any) => {
			this.length = data.length;
			this.pageSize = data.pageSize;
			this.dataSource = new MatTableDataSource<University>(data.universities);
		});
	}

	getUniversity(university: University) {
		this.universityService.getUniversity(university.id).subscribe((data: any) => {
			let index = this.dataSource.data.findIndex((item) => item.id === data.university.id);
			this.dataSource.data[index].id = data.university.id;
			this.dataSource.data[index].name = data.university.name;
			this.dataSource.data[index].faculties = data.university.faculties;
		});
	}

	onAddSubmit(university: University) {
		this.universityService.addUniversity(university).subscribe((data: any) => {
			if (this.dataSource.data.length < this.pageSize)
			{
				this.dataSource.data.push(data.university);
				this.dataSource = new MatTableDataSource<University>(this.dataSource.data);
			}

			this.length++;
			this.dialogRef.close();
		});
	}

	onEditSubmit(university: University) {
		this.universityService.editUniversity(university).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === university.id);
			this.dataSource.data[index].name = university.name;
			this.dialogRef.close();
		});
	}

	onDeleteSubmit(id: number) {
		this.universityService.deleteUniversity(id).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === id);
			this.dataSource.data.splice(index, 1);
			this.dataSource = new MatTableDataSource<University>(this.dataSource.data);
			this.length--;
			this.dialogRef.close();
		});
	}

	onPageChanged(event) {
		this.getUniversities(event.pageSize, +event.pageIndex + 1);
	}

	openAddDialog() {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Add',
				submitColor: 'primary',
				university: new University()
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((university: University) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onAddSubmit(university)
		});
	}

	openShowDialog(university: University) {
		this.dialogRef = this.dialog.open(ShowDialogComponent, {
			data: {
				university: university
			}
		});
		this.dialogRef.afterOpened().subscribe(() => {
			if (!university.faculties) this.getUniversity(university)
		});
	}

	openEditDialog(university: University) {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Edit',
				submitColor: 'accent',
				university: university
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((university: University) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onEditSubmit(university)
		});
	}

	openDeleteDialog(university: University) {
		this.dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {
				title: 'university',
				name: university.name,
				id: university.id
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((id: number) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDeleteSubmit(id)
		});
	}
}