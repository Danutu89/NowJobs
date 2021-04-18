import { GET_JOB, GOT_JOB, GET_JOB_FAILED } from '$constants/job';
import type { State } from '$types/job';
import type { Action } from '$vendor/sedux/types/action';

export const jobReducer = (action: Action, state: State): State => {
	switch (action.type) {
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
	}
	return state;
};
