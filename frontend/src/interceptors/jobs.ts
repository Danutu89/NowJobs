import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import type { GetJobs, GetMoreJobs, GetJob, ApplyJob } from '$types/jobs/actions';
import type { PaginatedResponse, Response } from '$types/response';
import {
	getJobsFailed,
	getMoreJobsFailed,
	gotJobs,
	gotMoreJobs,
	getJobFailed,
	gotJob,
	applyJobFailed,
	appliedJob
} from '$actions/jobs';
import { GET_JOBS, GET_MORE_JOBS, GET_JOB, APPLY_JOB } from '$constants/jobs';
import type { Job, Offer } from '$types/jobs';

const getJobs = async ({ filters, name }: GetJobs): Promise<void> => {
	try {
		const res = await request.get('/api/jobs/', filters);
		const json: PaginatedResponse<Job> = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details[0];
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => getJobsFailed({ status: res.status, message: error }, name));
		}
		return dispatch(() => gotJobs(json, name));
	} catch (error) {
		return dispatch(() => getJobsFailed({ status: 500, message: error }, name));
	}
};

const getMoreJobs = async ({ filters, page, name }: GetMoreJobs): Promise<void> => {
	try {
		const res = await request.get(`/api/jobs/?page=${page}`, filters);
		const json: PaginatedResponse<Job> = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details;
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => getMoreJobsFailed({ status: res.status, message: error }, name));
		}
		return dispatch(() => gotMoreJobs(json, page, name));
	} catch (error) {
		return dispatch(() => getMoreJobsFailed({ status: 500, message: error }, name));
	}
};

const getJob = async ({ id, name }: GetJob): Promise<void> => {
	try {
		const res = await request.get(`/api/jobs/${id}`);
		const json: Response<Job> = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details;
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => getJobFailed({ status: res.status, message: error }, name));
		}
		return dispatch(() => gotJob(json, name));
	} catch (error) {
		return dispatch(() => getJobFailed({ status: 500, message: error }, name));
	}
};

const applyJob = async ({ offer, name }: ApplyJob): Promise<void> => {
	try {
		const res = await request.post(`/api/jobs/applicants/`, offer);
		const json: Response<Offer> = await res.json();
		if (res.status !== 201) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details;
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => applyJobFailed({ message: error, status: res.status }, name));
		}
		return dispatch(() => appliedJob(json, name));
	} catch (error) {
		return dispatch(() => applyJobFailed({ message: error, status: 500 }, name));
	}
};

export function jobsInterceptor(action: Value): void {
	switch (action.type) {
		case GET_JOBS:
			getJobs(action);
			break;
		case GET_MORE_JOBS:
			getMoreJobs(action);
			break;
		case GET_JOB:
			getJob(action);
			break;
		case APPLY_JOB:
			applyJob(action);
			break;
		default:
			break;
	}
}
