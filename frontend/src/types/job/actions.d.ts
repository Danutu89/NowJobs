import type { Action } from '$vendor/sedux/types/action';
import type { Job } from './state';

export interface GetJob extends Action {
	id: string;
}

export interface GotJob extends Action {
	result: Job;
}

export interface GetJobFailed extends Action {
	status: number;
	error: string;
}
