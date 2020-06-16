export class StudentProfile {
	public birthdate: Date;
	public year: number;

	constructor(birthdate: Date = null, year: number = 0) {
		this.birthdate = birthdate;
		this.year = year;
	}

	toJson() {
		let date = typeof this.birthdate === 'string' ? this.birthdate : this.birthdate.toISOString();

		return {
			'birthdate': date.slice(0, date.indexOf('T')),
			'year': this.year
		}
	}
}