export interface Applicant {
	name: string;
	email: string;
	first_name: string;
	last_name: string;
	cv: string;
	description: string;
	phone: string;
	id: string;
}

export interface State {
	applicants: {
		results: Array<Applicant>;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
	applicant: {
		result: Applicant;
		loading: boolean;
		error: {
			status: number;
			message: string;
		};
	};
}
