import { storex } from '$vendor/sedux';
import type { State } from '$types/companies';

export const initialState = {
	companies: {
		results: [],
		error: {
			status: 200,
			message: ''
		},
		loading: false
	}
} as State;

export const companiesStore = storex<State>(initialState);
