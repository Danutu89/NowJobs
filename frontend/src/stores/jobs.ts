import { storex } from '$vendor/sedux';
import type { State } from '$types/jobs';

export const initialState = {
	jobs: {
		results: [],
		error: '',
		count: 0,
		page: 1,
		next: '',
		loading: false
	},
	more: {
		loading: false,
		error: ''
	}
} as State;

export const jobsStore = storex<State>(initialState);
