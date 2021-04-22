import { storex } from '$vendor/sedux';
import type { State } from '$types/applicants';

export const initialState = {
	applicants: {
		results: [],
		error: {
			status: 200,
			message: ''
		},
		loading: false
	},
	applicant: {
		result: {},
		error: {
			status: 200,
			message: ''
		},
		loading: true
	}
} as State;

export const applicantsStore = storex(initialState);
