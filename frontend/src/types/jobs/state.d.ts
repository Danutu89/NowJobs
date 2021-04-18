import type { Applicant } from '$types/applicants';
import type { Company } from '$types/companies';
import type { Category, Domain } from '$types/job/state';
import type { Permissions } from '$types/permissions';

export type Filters =
	| {
			search: string;
			company: string;
			domain: string;
			created_on: string;
			remote: boolean | null;
			location: string;
			category: string;
	  }
	| Record<string, string>;

export type Offer = Applicant & { job: string };

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
	jobs: {
		results: Array<Job> | undefined[];
		error: {
			status: number;
			message: string;
		};
		count: number;
		page: number;
		next: string;
		loading: boolean;
	};
	more: {
		loading: boolean;
		error: {
			status: number;
			message: string;
		};
	};
	job: {
		result: Job;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
	apply: {
		result: Offer;
		error: {
			status: number;
			message: string;
		};
		loading: boolean;
	};
}
