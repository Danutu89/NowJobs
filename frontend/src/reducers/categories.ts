import { GET_CATEGORIES, GET_CATEGORIES_FAILED, GOT_CATEGORIES } from '$constants/categories';
import type { State } from '$types/categories';
import type { Action } from '$vendor/sedux/types/action';

export const categoriesReducer = (action: Action, state: State): State => {
	switch (action.type) {
		case GET_CATEGORIES:
			state.categories.loading = true;
			state.categories.error = {
				message: '',
				status: 200
			};
			state.categories.results = [];
			break;
		case GOT_CATEGORIES:
			state.categories.loading = false;
			state.categories.results = action.results;
			break;
		case GET_CATEGORIES_FAILED:
			state.categories.loading = false;
			state.categories.error = action.error;
			break;
	}
	return state;
};
