import { storex } from '$vendor/sedux';
import type { State } from '$types/jobs';

export const initialState = {
	jobs: {
		results: [],
		error: {
			status: 200,
			message: ''
		},
		count: 0,
		page: 1,
		next: '',
		loading: false
	},
	more: {
		loading: false,
		error: {
			status: 200,
			message: ''
		}
	}
} as State;

export const jobsStore = storex<State>(initialState);
