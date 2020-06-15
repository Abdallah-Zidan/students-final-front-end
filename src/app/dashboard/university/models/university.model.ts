import { Faculty } from '../../faculty/models/faculty.model';

export class University {
	public id: number;
	public name: string;
	public faculties: Array<Faculty>;

	constructor(id: number = 0, name: string = '', faculties: Faculty[] = null) {
		this.id = id;
		this.name = name;

		if (faculties) this.faculties = new Array<Faculty>(...faculties);
	}

	toJson() {
		return {
			'id': this.id,
			'name': this.name
		}
	}
}