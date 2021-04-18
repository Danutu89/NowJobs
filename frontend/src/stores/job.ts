import { storex } from '$vendor/sedux';
import type { State } from '$types/job';

export const initialState = {
	job: {
		result: {},
		error: {
			status: 200,
			message: ''
		},
		loading: false
	}
} as State;

export const jobStore = storex<State>(initialState);
