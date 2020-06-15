import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizedGuard } from '../auth/services/authorized.guard';
import { DashboardComponent } from './dashboard.component';
import { UniversityComponent } from './university/university.component';
import { FacultyComponent } from './faculty/faculty.component';
import { DepartmentComponent } from './department/department.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [{
	path: '', component: DashboardComponent, children: [
		{
			path: 'universities',
			component: UniversityComponent,
			canActivate: [AuthorizedGuard],
			data: { roles: [0] }
		},
		{
			path: 'faculties',
			component: FacultyComponent,
			canActivate: [AuthorizedGuard],
			data: { roles: [0] }
		},
		{ path: 'departments', component: DepartmentComponent },
		{ path: 'courses', component: CourseComponent }
	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }