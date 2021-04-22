import type { Action } from '$vendor/sedux/types/action';
import type { User, UserRegister } from './state';

export interface Login extends Action {
	email: string;
	password: string;
}
export interface LoginFailed extends Action {
	error: {
		status: number;
		message: string;
	};
}
export interface LoggedIn extends Action {
	data: User;
}

export interface Logout extends Action {
	name: string;
}

export interface LoggedOut extends Action {
	name: string;
}

export interface LogoutFailed extends Action {
	error: string;
}

export interface Register extends Action {
	data: UserRegister;
}
export interface Registered extends Action {
	token: string;
	data: User;
}
export interface RegisterFailed extends Action {
	error: string;
}

export interface RefreshToken extends Action {
	name: stirng;
}
export interface RefreshedToken extends Action {
	token: string;
}
export interface RefreshTokenFailed extends Action {
	error: string;
}
