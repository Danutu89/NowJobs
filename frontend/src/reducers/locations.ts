import { GET_LOCATIONS, GET_LOCATIONS_FAILED, GOT_LOCATIONS } from '$constants/locations';
import type { State } from '$types/locations';
import type { Action } from '$vendor/sedux/types/action';

export const locationsReducer = (action: Action, state: State): State => {
	switch (action.type) {
		case GET_LOCATIONS:
			state.locations.loading = true;
			state.locations.error = {
				message: '',
				status: 200
			};
			state.locations.results = [];
			break;
		case GOT_LOCATIONS:
			state.locations.loading = false;
			state.locations.results = action.results;
			break;
		case GET_LOCATIONS_FAILED:
			state.locations.loading = false;
			state.locations.error = action.error;
			break;
	}
	return state;
};
