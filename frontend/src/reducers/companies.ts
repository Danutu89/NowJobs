import { GET_COMPANIES, GET_COMPANIES_FAILED, GOT_COMPANIES } from '$constants/companies';
import type { State } from '$types/companies';
import type { Action } from '$vendor/sedux/types/action';

export const companiesReducer = (action: Action, state: State): State => {
	switch (action.type) {
		case GET_COMPANIES:
			state.companies.loading = true;
			state.companies.error = {
				message: '',
				status: 200
			};
			state.companies.results = [];
			break;
		case GOT_COMPANIES:
			state.companies.loading = false;
			state.companies.results = action.results;
			break;
		case GET_COMPANIES_FAILED:
			state.companies.loading = false;
			state.companies.error = action.error;
			break;
	}
	return state;
};
