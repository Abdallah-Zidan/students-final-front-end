import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../auth/services/auth.service';
import { CourseService } from './services/course.service';
import { Course } from './models/course.model';
import { Department } from '../department/models/department.model';
import { Faculty } from '../faculty/models/faculty.model';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';
import { ShowDialogComponent } from './components/show-dialog/show-dialog.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { AttachDialogComponent } from './components/attach-dialog/attach-dialog.component';
import { User as AuthUser } from '../../auth/user.model';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
	user: AuthUser;
	displayedColumns = ['name', 'options'];
	length: number;
	pageSize: number;
	pageSizeOptions = [5, 10, 25, 100];
	dataSource: MatTableDataSource<Course>;
	dialogRef: MatDialogRef<any, any>;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private authService: AuthService, private courseService: CourseService, private dialog: MatDialog) { }

	ngOnInit(): void {
		this.authService.user.subscribe((user: AuthUser) => this.user = user);
		this.dataSource = new MatTableDataSource<Course>();
		this.dataSource.paginator = this.paginator;
		this.getCourses(this.pageSizeOptions[1], 1);
	}

	getCourses(items: number, page: number) {
		this.courseService.getCourses(items, page).subscribe((data: any) => {
			this.length = data.length;
			this.pageSize = data.pageSize;
			this.dataSource = new MatTableDataSource<Course>(data.courses);
		});
	}

	getCourse(course: Course) {
		this.courseService.getCourse(course.id).subscribe((data: any) => {
			let index = this.dataSource.data.findIndex((item) => item.id === data.course.id);
			this.dataSource.data[index].id = data.course.id;
			this.dataSource.data[index].name = data.course.name;
			this.dataSource.data[index].description = data.course.description;
			this.dataSource.data[index].departments = data.course.departments;
		});
	}

	onAddSubmit(course: Course) {
		this.courseService.addCourse(course).subscribe((data: any) => {
			if (this.dataSource.data.length < this.pageSize)
			{
				this.dataSource.data.push(data.course);
				this.dataSource = new MatTableDataSource<Course>(this.dataSource.data);
			}

			this.length++;
			this.dialogRef.close();
		});
	}

	onEditSubmit(course: Course) {
		this.courseService.editCourse(course).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === course.id);
			this.dataSource.data[index].name = course.name;
			this.dataSource.data[index].description = course.description;
			this.dialogRef.close();
		});
	}

	onDeleteSubmit(id: number) {
		this.courseService.deleteCourse(id).subscribe(() => {
			let index = this.dataSource.data.findIndex((item) => item.id === id);
			this.dataSource.data.splice(index, 1);
			this.dataSource = new MatTableDataSource<Course>(this.dataSource.data);
			this.length--;
			this.dialogRef.close();
		});
	}

	onAttachSubmit(course: Course, department: Department, faculty: Faculty) {
		this.courseService.attachCourse(course.id, department.id, faculty ? faculty.id : null).subscribe(() => {
			course.departments = null;
			this.dialogRef.close();
		});
	}

	onDetachSubmit(course: Course, department: Department, faculty: Faculty) {
		this.courseService.detachCourse(course.id, department.id, faculty ? faculty.id : null).subscribe(() => {
			course.departments = null;
			this.dialogRef.close();
		});
	}

	onPageChanged(event) {
		this.getCourses(event.pageSize, +event.pageIndex + 1);
	}

	openAddDialog() {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Add',
				submitColor: 'primary',
				course: new Course()
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((course: Course) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onAddSubmit(course)
		});
	}

	openShowDialog(course: Course) {
		this.dialogRef = this.dialog.open(ShowDialogComponent, {
			data: {
				course: course
			}
		});
		this.dialogRef.afterOpened().subscribe(() => {
			if (!course.departments) this.getCourse(course)
		});
	}

	openEditDialog(course: Course) {
		this.dialogRef = this.dialog.open(CreateDialogComponent, {
			data: {
				formName: 'Edit',
				submitColor: 'accent',
				course: course
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((course: Course) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onEditSubmit(course)
		});
	}

	openDeleteDialog(course: Course) {
		this.dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: {
				title: 'course',
				name: course.name,
				id: course.id
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((id: number) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDeleteSubmit(id)
		});
	}

	openAttachDialog(course: Course) {
		this.dialogRef = this.dialog.open(AttachDialogComponent, {
			data: {
				formName: 'Attach',
				submitColor: 'primary',
				course: course,
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onAttachSubmit(course, data.department, data.faculty);
		});
	}

	openDetachDialog(course: Course) {
		this.dialogRef = this.dialog.open(AttachDialogComponent, {
			data: {
				formName: 'Detach',
				submitColor: 'warn',
				course: course
			}
		});
		this.dialogRef.componentInstance.onSubmitd.subscribe((data: any) => {
			this.dialogRef.componentInstance.onSubmitd.unsubscribe();
			this.onDetachSubmit(course, data.department, data.faculty);
		});
	}
}