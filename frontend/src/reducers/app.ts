import {
	LOGIN,
	LOGGED_IN,
	LOGIN_FAILED,
	LOGOUT,
	LOGGED_OUT,
	LOGOUT_FAILED,
	REGISTER,
	REGISTERED,
	REGISTER_FAILED,
	REFRESH_TOKEN,
	REFRESHED_TOKEN,
	REFRESH_TOKEN_FAILED
} from '$constants/app';
import type { State } from '$types/app';
import type { Action } from '$vendor/sedux/types/action';

export const appReducer = (action: Action, state: State): State => {
	switch (action.type) {
		case REGISTER:
			state.register.loading = true;
			state.register.error = '';
			break;
		case LOGIN:
			state.login.loading = true;
			state.login.error = { status: 200, message: '' };
			break;
		case REGISTERED:
			state.register.loading = false;
			state.user.data = action.data;
			state.user.token = action.token;
			state.user.loggedIn = true;
			break;
		case LOGGED_IN:
			state.login.loading = false;
			state.user.data = action.data;
			state.user.token = action.token;
			state.user.loggedIn = true;
			break;
		case REGISTER_FAILED:
			state.register.loading = false;
			state.register.error = action.error;
			break;
		case LOGIN_FAILED:
			state.login.loading = false;
			state.login.error = action.error;
			break;
		case LOGOUT:
			state.logout.loading = true;
			break;
		case LOGGED_OUT:
			state.logout.loading = false;
			state.user.loggedIn = false;
			state.user.data = {};
			state.user.token = '';
			break;
		case LOGOUT_FAILED:
			state.logout.loading = false;
			state.logout.error = action.error;
			break;
		case REFRESH_TOKEN:
			state.refresh.loading = true;
			break;
		case REFRESHED_TOKEN:
			state.user.token = action.token;
			state.refresh.loading = false;
			break;
		case REFRESH_TOKEN_FAILED:
			state.user.data = {};
			state.user.token = '';
			state.user.loggedIn = false;
			state.refresh.loading = false;
			state.refresh.error = action.error;
			break;
	}
	return state;
};
