import { storex } from '$vendor/sedux';
import type { State } from '$types/domains';

export const initialState = {
	domains: {
		results: [],
		error: {
			status: 200,
			message: ''
		},
		loading: false
	}
} as State;

export const domainsStore = storex<State>(initialState);
