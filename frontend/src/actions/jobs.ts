import {
	GET_JOBS,
	GET_JOBS_FAILED,
	GET_MORE_JOBS,
	GET_MORE_JOBS_FAILED,
	GOT_JOBS,
	GOT_MORE_JOBS
} from '$constants/jobs';
import type {
	GetJobs,
	GetJobsFailed,
	GetMoreJobs,
	GetMoreJobsFailed,
	GotJobs,
	GotMoreJobs
} from '$types/jobs/actions';
import type { Job } from '$types/jobs';
import type { PaginatedResponse } from '$types/response';

export const getJobs = (name: string): GetJobs => {
	return {
		type: GET_JOBS,
		name
	};
};

export const gotJobs = (
	{ results, count, next }: PaginatedResponse<Job>,
	name: string
): GotJobs => {
	return {
		type: GOT_JOBS,
		results,
		count,
		next,
		name
	};
};

export const getJobsFailed = (error: string, name: string): GetJobsFailed => {
	return {
		type: GET_JOBS_FAILED,
		error,
		name
	};
};

export const getMoreJobs = (page: number, name: string): GetMoreJobs => {
	return {
		type: GET_MORE_JOBS,
		page,
		name
	};
};

export const gotMoreJobs = (
	{ results, count, next }: PaginatedResponse<Job>,
	page: number,
	name: string
): GotMoreJobs => {
	return {
		type: GOT_MORE_JOBS,
		results,
		count,
		next,
		page,
		name
	};
};

export const getMoreJobsFailed = (error: string, name: string): GetMoreJobsFailed => {
	return {
		type: GET_MORE_JOBS_FAILED,
		error,
		name
	};
};
