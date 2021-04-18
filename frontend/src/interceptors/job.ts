import { dispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import type { Value } from '$vendor/sedux/types/storex';
import type { GetJob } from '$types/job/actions';
import { getJobFailed, gotJob } from '$actions/job';
import { GET_JOB } from '$constants/job';
import type { Job } from '$types/job';
import type { Response } from '$types/response';

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

			return dispatch(() => getJobFailed(error, res.status, name));
		}
		return dispatch(() => gotJob(json, name));
	} catch (error) {
		return dispatch(() => getJobFailed(error, 500, name));
	}
};

export function jobInterceptor(action: Value): void {
	switch (action.type) {
		case GET_JOB:
			getJob(action);
			break;
		default:
			break;
	}
}
