import { GET_JOB, GET_JOB_FAILED, GOT_JOB } from '$constants/job';
import type { Job } from '$types/job';
import type { GetJob, GetJobFailed, GotJob } from '$types/job/actions';

export const getJob = (id: string, name: string): GetJob => {
	return {
		type: GET_JOB,
		name,
		id
	};
};

export const gotJob = (result: Job, name: string): GotJob => {
	return {
		type: GOT_JOB,
		result,
		name
	};
};

export const getJobFailed = (error: string, status: number, name: string): GetJobFailed => {
	return {
		type: GET_JOB_FAILED,
		error,
		status,
		name
	};
};
