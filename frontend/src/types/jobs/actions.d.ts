import type { Action } from '$vendor/sedux/types/action';
import type { Filters, Job } from './state';

export interface GetJobs extends Action {
	name: string;
	filters: Filters;
}

export interface GotJobs extends Action {
	results: Array<Job>;
	count: number;
	next: string;
}

export interface GetJobsFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}

export interface GetMoreJobs extends Action {
	page: number;
	filters: Filters;
}

export interface GotMoreJobs extends Action {
	results: Array<Job>;
	count: number;
	page: number;
	next: string;
}

export interface GetMoreJobsFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}
