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
}
export interface State {
	jobs: {
		results: Array<Job> | undefined[];
		error: string;
		count: number;
		page: number;
		next: string;
		loading: boolean;
	};
	more: {
		loading: boolean;
		error: string;
	};
}
