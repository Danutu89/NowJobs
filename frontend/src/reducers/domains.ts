import { GET_DOMAINS, GET_DOMAINS_FAILED, GOT_DOMAINS } from '$constants/domains';
import type { State } from '$types/domains';
import type { Action } from '$vendor/sedux/types/action';

export const domainsReducer = (action: Action, state: State): State => {
	switch (action.type) {
		case GET_DOMAINS:
			state.domains.loading = true;
			state.domains.error = {
				message: '',
				status: 200
			};
			state.domains.results = [];
			break;
		case GOT_DOMAINS:
			state.domains.loading = false;
			state.domains.results = action.results;
			break;
		case GET_DOMAINS_FAILED:
			state.domains.loading = false;
			state.domains.error = action.error;
			break;
	}
	return state;
};
