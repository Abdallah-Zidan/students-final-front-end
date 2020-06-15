import { StudentProfile } from './student-profile.model';
import { TeachingStaffProfile } from './teaching-staff-profile.model';
import { CompanyProfile } from './company-profile.model';
import { ModeratorProfile } from './moderator-profile.model';
import { Faculty } from '../../faculty/models/faculty.model';
import { Course } from '../../course/models/course.model';

export class User {
	public id: number;
	public name: string;
	public email: string;
	public password: string;
	public verified: boolean;
	public gender: string;
	public blocked: boolean;
	public address: string;
	public mobile: string;
	public avatar;
	public type: string;
	public profile;
	public faculties: Array<Faculty>;
	public courses: Array<Course>;

	constructor(id: number = 0, name: string = '', email: string = '', password: string = '', verified: boolean = false, gender: string = '', blocked: boolean = false, address: string = '', mobile: string = '', avatar = null, type: string = '', profile: StudentProfile | TeachingStaffProfile | CompanyProfile | ModeratorProfile = null, faculties: Faculty[] = null, courses: Course[] = null) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.verified = verified;
		this.gender = gender;
		this.blocked = blocked;
		this.address = address;
		this.mobile = mobile;
		this.avatar = avatar;
		this.type = type;
		this.profile = profile;

		if (faculties) this.faculties = new Array<Faculty>(...faculties);
		if (courses) this.courses = new Array<Course>(...courses);
	}

	toJson(method = '') {
		let data = new FormData();
		let type;
		let profileData = this.profile ? this.profile.toJson() : undefined;

		if (this.type === 'Student')
			type = 0;
		else if (this.type === 'TeachingStaff')
			type = 1;
		else if (this.type === 'Company')
			type = 2;
		else if (this.type === 'Moderator')
			type = 3;
		else if (this.type === 'Admin')
			type = 4;

		if (method) data.append('_method', method);
		
		data.append('id', this.id.toString());
		data.append('name', this.name);
		data.append('email', this.email);

		if (this.password) data.append('password', this.password);

		data.append('gender', (this.gender === 'Male' ? 0 : 1).toString());
		data.append('blocked', (this.blocked ? 1 : 0).toString());
		data.append('address', this.address);
		data.append('mobile', this.mobile);

		if (this.avatar instanceof File) data.append('avatar', this.avatar);

		data.append('type', type);

		for (var property in profileData)
			if (profileData.hasOwnProperty(property))
				data.append(property, profileData[property]);

		return data;
	}
}