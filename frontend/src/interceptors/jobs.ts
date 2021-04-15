import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import type { GetJobs, GetMoreJobs } from '$types/jobs/actions';
import type { PaginatedResponse } from '$types/response';
import { getJobsFailed, getMoreJobsFailed, gotJobs, gotMoreJobs } from '$actions/jobs';
import { GET_JOBS, GET_MORE_JOBS } from '$constants/jobs';
import type { Job } from '$types/jobs';

const getJobs = async ({ name }: GetJobs): Promise<void> => {
	try {
		const res = await request.get('/api/jobs/');
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

			return dispatch(() => getJobsFailed(error, name));
		}
		return dispatch(() => gotJobs(json, name));
	} catch (error) {
		return dispatch(() => getJobsFailed(error, name));
	}
};

const getMoreJobs = async ({ page, name }: GetMoreJobs): Promise<void> => {
	try {
		const res = await request.get(`/api/jobs/?page=${page}`);
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

			return dispatch(() => getMoreJobsFailed(error, name));
		}
		return dispatch(() => gotMoreJobs(json, page, name));
	} catch (error) {
		return dispatch(() => getMoreJobsFailed(error, name));
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
		default:
			break;
	}
}
