import type { Permissions } from '$types/permissions';

export interface Company {
	icon: string;
	name: string;
}

export interface Domain {
	name: string;
}

export interface Category {
	name: string;
}

export interface Job {
	title: string;
	description: string;
	permissions: Permissions;
	owner: Company;
	domain: Domain;
	category: Category;
	remote: boolean;
	salary: number;
	seats: number;
	created_on: string;
	link: string;
	offered: boolean;
	offer: Offer;
}
export interface State {
	job: {
		result: Job;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
}
