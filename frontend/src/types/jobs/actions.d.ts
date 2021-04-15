import type { Action } from '$vendor/sedux/types/action';
import type { Job } from './state';

export interface GetJobs extends Action {
	name: string;
}

export interface GotJobs extends Action {
	results: Array<Job>;
	count: number;
	next: string;
}

export interface GetJobsFailed extends Action {
	error: string;
}

export interface GetMoreJobs extends Action {
	page: number;
}

export interface GotMoreJobs extends Action {
	results: Array<Job>;
	count: number;
	page: number;
	next: string;
}

export interface GetMoreJobsFailed extends Action {
	error: string;
}
