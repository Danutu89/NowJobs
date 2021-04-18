import {
	GET_APPLICANT,
	GET_APPLICANTS,
	GET_APPLICANTS_FAILED,
	GET_APPLICANT_FAILED,
	GOT_APPLICANT,
	GOT_APPLICANTS
} from '$constants/applicants';
import type { State } from '$types/applicants';
import type { Action } from '$vendor/sedux/types/action';

export const applicantsReducer = (action: Action, state: State): State => {
	switch (action.type) {
		case GET_APPLICANTS:
			state.applicants.loading = true;
			state.applicants.error = {
				message: '',
				status: 200
			};
			state.applicants.results = [];
			break;
		case GOT_APPLICANTS:
			state.applicants.loading = false;
			state.applicants.results = action.results;
			break;
		case GET_APPLICANTS_FAILED:
			state.applicants.loading = false;
			state.applicants.error = action.error;
			break;
		case GET_APPLICANT:
			state.applicant.loading = true;
			state.applicant.error = {
				message: '',
				status: 200
			};
			break;
		case GOT_APPLICANT:
			state.applicant.loading = false;
			state.applicant.result = action.result;
			break;
		case GET_APPLICANT_FAILED:
			state.applicant.loading = false;
			state.applicant.error = action.error;
			break;
	}
	return state;
};
