import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth/services/auth.service';
import { DepartmentService } from './services/department.service';
import { Department } from './models/department.model';
import { Faculty } from '../faculty/models/faculty.model';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { ShowDialogComponent } from './components/show-dialog/show-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { AttachDialogComponent } from './components/attach-dialog/attach-dialog.component';
import { User as AuthUser } from '../../auth/user.model';

@Component({
	selector: 'app-department',
	templateUrl: './department.component.html',
	styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
	user: AuthUser;
	displayedColumns = ['id', 'name', 'options'];
	length: number;
	pageSize: number;
	pageSizeOptions = [5, 10, 25, 100];
	dataSource: MatTableDataSource<Department>;
	dialogRef: MatDialogRef<any, any>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private authService: AuthService, private departmentService: DepartmentService, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.authService.user.subscribe((user: AuthUser) => this.user = user);
		this.dataSource = new MatTableDataSource<Department>();
		this.dataSource.paginator = this.paginator;
		this.getDepartments(this.pageSizeOptions[1], 1);
	}

	getDepartments(items: number, page: number) {
		this.departmentService.getDepartments(items, page).subscribe((data: any) => {
			this.length = data.length;
			this.pageSize = data.pageSize;
			this.dataSource = new MatTableDataSource<Department>(data.departments);
		});
	}

	getDepartment(department: Department) {
		this.departmentService.getDepartment(department.id).subscribe((data: any) => {
			let index = this.dataSource.data.findIndex((item) => item.id === data.department.id);
			this.dataSource.data[index].id = data.department.id;
			this.dataSource.data[index].name = data.department.name;
			this.dataSource.data[index].faculties = data.department.faculties;
			this.dataSource.data[index].courses = data.department.courses;
		});
	}

	onAddSubmit(department: Department) {
		this.departmentService.addDepartment(department).subscribe((data: any) => {
			if (this.dataSource.data.length < this.pageSize)
			{
				this.dataSource.data.push(data.department);
				this.dataSource = new MatTableDataSource<Department>(this.dataSource.data);
			}

			this.length++;
			this.dialogRef.close();
		});
	}

	onEditSubmit(department: Department) {
		this.departmentService.editDepartment(department).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === department.id);
			this.dataSource.data[index].name = department.name;
			this.dialogRef.close();
		});
	}

	onDeleteSubmit(id: number) {
		this.departmentService.deleteDepartment(id).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === id);
			this.dataSource.data.splice(index, 1);
			this.dataSource = new MatTableDataSource<Department>(this.dataSource.data);
			this.length--;
			this.dialogRef.close();
		});
	}

	onAttachSubmit(department: Department, faculty: Faculty) {
		this.departmentService.attachDepartment(department.id, faculty ? faculty.id : null).subscribe(() => {
			department.faculties = null;
			department.courses = null;
			this.dialogRef.close();
		});
	}

	onDetachSubmit(department: Department, faculty: Faculty) {
		this.departmentService.detachDepartment(department.id, faculty ? faculty.id : null).subscribe(() => {
			department.faculties = null;
			department.courses = null;
			this.dialogRef.close();
		});
	}

	onPageChanged(event) {
		this.getDepartments(event.pageSize, +event.pageIndex + 1);
	}

	openAddDialog() {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Add',
				submitColor: 'primary',
				department: new Department()
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((department: Department) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onAddSubmit(department)
		});
	}

	openShowDialog(department: Department) {
		this.dialogRef = this.dialog.open(ShowDialogComponent, {
			data: {
				department: department
			}
		});
		this.dialogRef.afterOpened().subscribe(() => {
			if (!department.faculties || !department.courses) this.getDepartment(department)
		});
	}

	openEditDialog(department: Department) {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Edit',
				submitColor: 'accent',
				department: department
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((department: Department) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onEditSubmit(department)
		});
	}

	openDeleteDialog(department: Department) {
		this.dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {
				title: 'department',
				name: department.name,
				id: department.id
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((id: number) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDeleteSubmit(id)
		});
	}

	openAttachDialog(department: Department) {
		this.dialogRef = this.dialog.open(AttachDialogComponent, {
			data: {
				formName: 'Attach',
				submitColor: 'primary',
				department: department,
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onAttachSubmit(data.department, data.faculty);
		});
	}

	openDetachDialog(department: Department) {
		this.dialogRef = this.dialog.open(AttachDialogComponent, {
			data: {
				formName: 'Detach',
				submitColor: 'warn',
				department: department
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDetachSubmit(data.department, data.faculty);
		});
	}
}