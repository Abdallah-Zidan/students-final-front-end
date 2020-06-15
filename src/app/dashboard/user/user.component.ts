import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { Department } from '../department/models/department.model';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { ShowDialogComponent } from './components/show-dialog/show-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { AttachDialogComponent } from './components/attach-dialog/attach-dialog.component';
import { Faculty } from '../faculty/models/faculty.model';
import { Course } from '../course/models/course.model';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	displayedColumns = ['name', 'email', 'verified', 'blocked', 'type', 'options'];
	length: number;
	pageSize: number;
	pageSizeOptions = [5, 10, 25, 100];
	dataSource: MatTableDataSource<User>;
	dialogRef: MatDialogRef<any, any>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private userService: UserService, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.dataSource = new MatTableDataSource<User>();
		this.dataSource.paginator = this.paginator;
		this.getUsers(this.pageSizeOptions[1], 1);
	}

	getUsers(items: number, page: number) {
		this.userService.getUsers(items, page).subscribe((data: any) => {
			this.length = data.length;
			this.pageSize = data.pageSize;
			this.dataSource = new MatTableDataSource<User>(data.users);
		});
	}

	getUser(user: User) {
		this.userService.getUser(user.id).subscribe((data: any) => {
			let index = this.dataSource.data.findIndex((item) => item.id === data.user.id);
			this.dataSource.data[index].id = data.user.id;
			this.dataSource.data[index].name = data.user.name;
			this.dataSource.data[index].email = data.user.email;
			this.dataSource.data[index].verified = data.user.verified;
			this.dataSource.data[index].gender = data.user.gender;
			this.dataSource.data[index].blocked = data.user.blocked;
			this.dataSource.data[index].address = data.user.address;
			this.dataSource.data[index].mobile = data.user.mobile;
			this.dataSource.data[index].avatar = data.user.avatar;
			this.dataSource.data[index].profile = data.user.profile;
			this.dataSource.data[index].faculties = data.user.faculties;
			this.dataSource.data[index].courses = data.user.courses;
		});
	}

	onAddSubmit(user: User, department: Department) {
		this.userService.addUser(user, department).subscribe((data: any) => {
			if (this.dataSource.data.length < this.pageSize)
			{
				this.dataSource.data.push(data.user);
				this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
			}

			this.length++;
			this.dialogRef.close();
		});
	}

	onEditSubmit(user: User) {
		this.userService.editUser(user).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === user.id);
			this.dataSource.data[index].name = user.name;
			this.dataSource.data[index].email = user.email;
			this.dataSource.data[index].gender = user.gender;
			this.dataSource.data[index].blocked = user.blocked;
			this.dataSource.data[index].address = user.address;
			this.dataSource.data[index].mobile = user.mobile;
			this.dataSource.data[index].avatar = user.avatar;
			this.dataSource.data[index].profile = user.profile;
			this.dialogRef.close();
		});
	}

	onDeleteSubmit(id: number) {
		this.userService.deleteUser(id).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === id);
			this.dataSource.data.splice(index, 1);
			this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
			this.length--;
			this.dialogRef.close();
		});
	}

	onAttachDepartmentSubmit(user: User, department: Department, faculty: Faculty) {
		this.userService.attachDepartment(user.id, department.id, faculty ? faculty.id : null).subscribe(() => {
			user.faculties = null;
			this.dialogRef.close();
		});
	}

	onAttachCourseSubmit(user: User, course: Course, department: Department, faculty: Faculty) {
		this.userService.attachCourse(user.id, course.id, department.id, faculty ? faculty.id : null).subscribe(() => {
			user.courses = null;
			this.dialogRef.close();
		});
	}

	onDetachDepartmentSubmit(user: User, department: Department, faculty: Faculty) {
		this.userService.detachDepartment(user.id, department.id, faculty ? faculty.id : null).subscribe(() => {
			user.faculties = null;
			this.dialogRef.close();
		});
	}

	onDetachCourseSubmit(user: User, course: Course, department: Department, faculty: Faculty) {
		this.userService.detachCourse(user.id, course.id, department.id, faculty ? faculty.id : null).subscribe(() => {
			user.courses = null;
			this.dialogRef.close();
		});
	}

	onPageChanged(event) {
		this.getUsers(event.pageSize, +event.pageIndex + 1);
	}

	openAddDialog() {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Add',
				submitColor: 'primary',
				user: new User()
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onAddSubmit(data.user, data.department)
		});
	}

	openShowDialog(user: User) {
		this.dialogRef = this.dialog.open(ShowDialogComponent, {
			data: {
				user: user
			}
		});
		this.dialogRef.afterOpened().subscribe(() => {
			if (!user.faculties || !user.courses) this.getUser(user)
		});
	}

	openEditDialog(user: User) {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Edit',
				submitColor: 'accent',
				user: user
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onEditSubmit(data.user)
		});
	}

	openDeleteDialog(user: User) {
		this.dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {
				title: 'user',
				name: user.name,
				id: user.id
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((id: number) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDeleteSubmit(id)
		});
	}

	openAttachDialog(user: User) {
		this.dialogRef = this.dialog.open(AttachDialogComponent, {
			data: {
				formName: 'Attach',
				submitColor: 'primary',
				user: user,
			}
		});
		this.dialogRef.componentInstance.onDepartmentSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onDepartmentSubmitd.unsubscribe();
			this.onAttachDepartmentSubmit(user, data.department, data.faculty);
		});
		this.dialogRef.componentInstance.onCourseSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onCourseSubmitd.unsubscribe();
			this.onAttachCourseSubmit(user, data.course, data.department, data.faculty);
		});
	}

	openDetachDialog(user: User) {
		this.dialogRef = this.dialog.open(AttachDialogComponent, {
			data: {
				formName: 'Detach',
				submitColor: 'warn',
				user: user
			}
		});
		this.dialogRef.componentInstance.onDepartmentSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onDepartmentSubmitd.unsubscribe();
			this.onDetachDepartmentSubmit(user, data.department, data.faculty);
		});
		this.dialogRef.componentInstance.onCourseSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onCourseSubmitd.unsubscribe();
			this.onDetachCourseSubmit(user, data.course, data.department, data.faculty);
		});
	}
}