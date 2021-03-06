import {
	GET_JOBS,
	GET_JOBS_FAILED,
	GET_MORE_JOBS,
	GET_MORE_JOBS_FAILED,
	GOT_JOBS,
	GOT_MORE_JOBS,
	GET_JOB,
	GOT_JOB,
	GET_JOB_FAILED,
	APPLY_JOB,
	APPLIED_JOB,
	APPLY_JOB_FAILED
} from '$constants/jobs';
import type { State } from '$types/jobs';
import type { Action } from '$vendor/sedux/types/action';

export const jobsReducer = (action: Action, state: State): State => {
	switch (action.type) {
		case GET_JOBS:
			state.jobs.loading = true;
			state.jobs.error = {
				message: '',
				status: 200
			};
			state.jobs.results = [];
			break;
		case GOT_JOBS:
			state.jobs.loading = false;
			state.jobs.results = action.results;
			state.jobs.page = action.page;
			state.jobs.count = action.count;
			state.jobs.next = action.next;
			break;
		case GET_JOBS_FAILED:
			state.jobs.loading = false;
			state.jobs.error = action.error;
			break;
		case GET_MORE_JOBS:
			state.more.loading = true;
			state.more.error = {
				message: '',
				status: 200
			};
			break;
		case GOT_MORE_JOBS:
			state.more.loading = false;
			state.jobs.results = [...state.jobs.results, action.results];
			state.jobs.page = action.page;
			state.jobs.count = action.count;
			state.jobs.next = action.next;
			break;
		case GET_MORE_JOBS_FAILED:
			state.more.loading = false;
			state.more.error = action.error;
			break;
		case GET_JOB:
			state.job.loading = true;
			state.job.error = {
				message: '',
				status: 200
			};
			state.job.result = {};
			break;
		case GOT_JOB:
			state.job.loading = false;
			state.job.result = action.result;
			break;
		case GET_JOB_FAILED:
			state.job.loading = false;
			state.job.error = action.error;
			break;
		case APPLY_JOB:
			state.apply.loading = true;
			state.apply.result = {};
			state.apply.error = { status: 200, message: '' };
			break;
		case APPLIED_JOB:
			state.apply.loading = false;
			state.apply.result = action.result;
			break;
		case APPLY_JOB_FAILED:
			state.apply.loading = false;
			state.apply.error = action.error;
			break;
	}
	return state;
};
