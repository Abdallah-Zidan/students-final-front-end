export class TeachingStaffProfile {
	public birthdate: Date;
	public certificates: string;

	constructor(birthdate: Date = null, certificates: string = '') {
		this.birthdate = birthdate;
		this.certificates = certificates;
	}

	toJson() {
		let date = typeof this.birthdate === 'string' ? this.birthdate : this.birthdate.toISOString();

		return {
			'birthdate': date.slice(0, date.indexOf('T')),
			'scientific_certificates': this.certificates
		}
	}
}