import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FacultyService } from './services/faculty.service';
import { Faculty } from './models/faculty.model';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { ShowDialogComponent } from './components/show-dialog/show-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-faculty',
	templateUrl: './faculty.component.html',
	styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
	displayedColumns = ['name', 'university', 'options'];
	length: number;
	pageSize: number;
	pageSizeOptions = [5, 10, 25, 100];
	dataSource: MatTableDataSource<Faculty>;
	dialogRef: MatDialogRef<any, any>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private facultyService: FacultyService, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<Faculty>();
		this.dataSource.paginator = this.paginator;
		this.getFaculties(this.pageSizeOptions[1], 1);
	}

	getFaculties(items: number, page: number) {
		this.facultyService.getFaculties(items, page).subscribe((data: any) => {
			this.length = data.length;
			this.pageSize = data.pageSize;
			this.dataSource = new MatTableDataSource<Faculty>(data.faculties);
		});
	}

	getFaculty(faculty: Faculty) {
		this.facultyService.getFaculty(faculty.id).subscribe((data: any) => {
			let index = this.dataSource.data.findIndex((item) => item.id === data.faculty.id);
			this.dataSource.data[index].id = data.faculty.id;
			this.dataSource.data[index].name = data.faculty.name;
			this.dataSource.data[index].university = data.faculty.university;
			this.dataSource.data[index].departments = data.faculty.departments;
		});
	}

	onAddSubmit(faculty: Faculty) {
		this.facultyService.addFaculty(faculty).subscribe((data: any) => {
			if (this.dataSource.data.length < this.pageSize)
			{
				this.dataSource.data.push(data.faculty);
				this.dataSource = new MatTableDataSource<Faculty>(this.dataSource.data);
			}

			this.length++;
			this.dialogRef.close();
		});
	}

	onEditSubmit(faculty: Faculty) {
		this.facultyService.editFaculty(faculty).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === faculty.id);
			this.dataSource.data[index].name = faculty.name;
			this.dataSource.data[index].university = faculty.university;
			this.dialogRef.close();
		});
	}

	onDeleteSubmit(id: number) {
		this.facultyService.deleteFaculty(id).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === id);
			this.dataSource.data.splice(index, 1);
			this.dataSource = new MatTableDataSource<Faculty>(this.dataSource.data);
			this.length--;
			this.dialogRef.close();
		});
	}

	onPageChanged(event) {
		this.getFaculties(event.pageSize, +event.pageIndex + 1);
	}

	openAddDialog() {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Add',
				submitColor: 'primary',
				faculty: new Faculty()
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((faculty: Faculty) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onAddSubmit(faculty)
		});
	}

	openShowDialog(faculty: Faculty) {
		this.dialogRef = this.dialog.open(ShowDialogComponent, {
			data: {
				faculty: faculty
			}
		});
		this.dialogRef.afterOpened().subscribe(() => {
			if (!faculty.departments) this.getFaculty(faculty)
		});
	}

	openEditDialog(faculty: Faculty) {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Edit',
				submitColor: 'accent',
				faculty: faculty
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((faculty: Faculty) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onEditSubmit(faculty)
		});
	}

	openDeleteDialog(faculty: Faculty) {
		this.dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {
				title: 'faculty',
				name: faculty.name,
				id: faculty.id
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((id: number) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDeleteSubmit(id)
		});
	}
}