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
import type { User, UserRegister } from '$types/app';
import type {
	LoggedIn,
	LoggedOut,
	Login,
	LoginFailed,
	Logout,
	LogoutFailed,
	RefreshedToken,
	RefreshTokenFailed,
	RefreshToken,
	Register,
	Registered,
	RegisterFailed
} from '$types/app/actions';

export const login = (email: string, password: string, name: string): Login => {
	return {
		type: LOGIN,
		name,
		email,
		password
	};
};

export const loggedIn = (token: string, data: User, name: string): LoggedIn => {
	return {
		type: LOGGED_IN,
		name,
		token,
		data
	};
};

export const loginFailed = (error: string, name: string): LoginFailed => {
	return {
		type: LOGIN_FAILED,
		name,
		error
	};
};

export const logout = (name: string): Logout => {
	return {
		type: LOGOUT,
		name
	};
};

export const loggedOut = (name: string): LoggedOut => {
	return {
		type: LOGGED_OUT,
		name
	};
};

export const logoutFailed = (error: string, name: string): LogoutFailed => {
	return {
		type: LOGOUT_FAILED,
		name,
		error
	};
};

export const register = (data: UserRegister, name: string): Register => {
	return {
		type: REGISTER,
		data,
		name
	};
};

export const registered = (token: string, data: User, name: string): Registered => {
	return {
		type: REGISTERED,
		name,
		token,
		data
	};
};

export const registerFailed = (error: string, name: string): RegisterFailed => {
	return {
		type: REGISTER_FAILED,
		error,
		name
	};
};

export const refreshToken = (name: string): RefreshToken => {
	return {
		type: REFRESH_TOKEN,
		name
	};
};

export const refreshedToken = (token: string, name: string): RefreshedToken => {
	return {
		type: REFRESHED_TOKEN,
		token,
		name
	};
};

export const refreshTokenFailed = (error: string, name: string): RefreshTokenFailed => {
	return {
		type: REFRESH_TOKEN_FAILED,
		name,
		error
	};
};
