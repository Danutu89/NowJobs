import { storex } from '$vendor/sedux';
import type { State } from '$types/categories';

export const initialState = {
	categories: {
		results: [],
		error: {
			status: 200,
			message: ''
		},
		loading: false
	}
} as State;

export const categoriesStore = storex(initialState);
