import { storex } from '$vendor/sedux';
import type { State } from '$types/locations';

export const initialState = {
	locations: {
		results: [],
		error: {
			status: 200,
			message: ''
		},
		loading: false
	}
} as State;

export const locationsStore = storex(initialState);
