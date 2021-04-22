import { storex } from '$vendor/sedux';
import type { State } from '$types/app';

export const initialState = {
	user: {
		data: {},
		token: '',
		loggedIn: false
	},
	login: {
		loading: false,
		error: {
			status: 200,
			message: ''
		}
	},
	logout: {
		loading: false,
		error: ''
	},
	register: {
		loading: false,
		error: ''
	},
	refresh: {
		loading: false,
		error: ''
	}
} as State;

export const appStore = storex(initialState);
