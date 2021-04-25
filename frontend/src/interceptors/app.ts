import { LOGIN, LOGOUT, REGISTER, REFRESH_TOKEN } from '$constants/app';
import {
	loggedIn,
	loginFailed,
	loggedOut,
	logoutFailed,
	registered,
	registerFailed,
	refreshedToken,
	refreshTokenFailed
} from '$actions/app';
import { dispatch, timedDispatch } from '$vendor/sedux';
import { request } from '$utils/request';
import { appStore } from '$stores/app';
import { get } from 'svelte/store';
import type { Login, Logout, RefreshToken, Register } from '$types/app/actions';
import type {
	LoginResponse,
	RefreshTokenResponse,
	RegisterResponse
} from '$types/app/interceptors';
import type { Value } from '$vendor/sedux/types/storex';

const login = async ({ email, password, name }: Login): Promise<void> => {
	try {
		const res = await request.post('/api/auth/login/', {
			email,
			password
		});
		const json: LoginResponse = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details[0];
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => loginFailed({ status: res.status, message: error }, name));
		}
		timedDispatch({ type: REFRESH_TOKEN, name: 'app' }, 5);
		return dispatch(() => loggedIn(json.token, json.user, name));
	} catch (error) {
		return dispatch(() => loginFailed({ status: 500, message: error }, name));
	}
};

const register = async ({ data, name }: Register): Promise<void> => {
	try {
		const res = await request.post('/api/auth/registration/', data);
		const json: RegisterResponse = await res.json();
		if (res.status !== 201) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details[0];
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => registerFailed(error, name));
		}
		return dispatch(() => registered(json.token, json.user, name));
	} catch (error) {
		return dispatch(() => registerFailed(error, name));
	}
};

const logout = async ({ name }: Logout): Promise<void> => {
	try {
		const res = await request.post('/api/auth/logout/');
		const json = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details[0];
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => logoutFailed(error, name));
		}
		return dispatch(() => loggedOut(name));
	} catch (error) {
		return dispatch(() => logoutFailed(error, name));
	}
};

const refreshToken = async ({ name }: RefreshToken): Promise<void> => {
	try {
		const body = {
			token: get(appStore).user.token
		};
		const res = await request.post('/api/auth/refresh/', body);
		const json: RefreshTokenResponse = await res.json();
		if (res.status !== 200) {
			let error = '';

			if (json.non_field_errors) {
				error = json.non_field_errors[0];
			} else if (json.details) {
				error = json.details[0];
			} else {
				const key = Object.keys(json)[0];
				error = json[key][0];
			}

			return dispatch(() => refreshTokenFailed(error, name));
		}
		timedDispatch({ type: REFRESH_TOKEN, name: 'app' }, 5);
		return dispatch(() => refreshedToken(json.token, name));
	} catch (error) {
		return dispatch(() => refreshTokenFailed(error, name));
	}
};

export function appInterceptor(action: Value): void {
	switch (action.type) {
		case LOGIN:
			login(action);
			break;
		case LOGOUT:
			logout(action);
			break;
		case REGISTER:
			register(action);
			break;
		case REFRESH_TOKEN:
			refreshToken(action);
			break;
		default:
			break;
	}
}
