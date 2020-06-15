import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UniversityComponent } from './university/university.component';
import { FacultyComponent } from './faculty/faculty.component';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';
import { CreateDialogComponent as CreateUniversityDialogComponent } from './university/components/create-dialog/create-dialog.component';
import { ShowDialogComponent as ShowUniversityDialogComponent } from './university/components/show-dialog/show-dialog.component';
import { CreateDialogComponent as CreateFacultyDialogComponent } from './faculty/components/create-dialog/create-dialog.component';
import { ShowDialogComponent as ShowFacultyDialogComponent } from './faculty/components/show-dialog/show-dialog.component';
import { CreateDialogComponent as CreateDepartmentDialogComponent } from './department/components/create-dialog/create-dialog.component';
import { ShowDialogComponent as ShowDepartmentDialogComponent } from './department/components/show-dialog/show-dialog.component';
import { AttachDialogComponent as AttachDepartmentDialogComponent } from './department/components/attach-dialog/attach-dialog.component';
import { CreateDialogComponent as CreateCourseDialogComponent } from './course/components/create-dialog/create-dialog.component';
import { ShowDialogComponent as ShowCourseDialogComponent } from './course/components/show-dialog/show-dialog.component';
import { AttachDialogComponent as AttachCourseDialogComponent } from './course/components/attach-dialog/attach-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
	declarations: [
		DashboardComponent,
		UniversityComponent,
		FacultyComponent,
		DepartmentComponent,
		CourseComponent,
		CreateUniversityDialogComponent,
		ShowUniversityDialogComponent,
		CreateFacultyDialogComponent,
		ShowFacultyDialogComponent,
		CreateDepartmentDialogComponent,
		ShowDepartmentDialogComponent,
		AttachDepartmentDialogComponent,
		CreateCourseDialogComponent,
		ShowCourseDialogComponent,
		AttachCourseDialogComponent,
		DeleteDialogComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatTableModule,
		MatPaginatorModule,
		MatExpansionModule,
		MatButtonModule,
		MatDialogModule,
		MatInputModule,
		MatIconModule,
		MatListModule,
		MatSelectModule,
		DashboardRoutingModule
	]
})
export class DashboardModule { }