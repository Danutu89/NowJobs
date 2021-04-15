import type { ErrorResponse } from '$types/response';
import type { User } from './state';

export interface LoginResponse extends ErrorResponse {
	token: string;
	user: User;
}

export interface RegisterResponse extends ErrorResponse {
	token: string;
	user: User;
}

export interface RefreshTokenResponse extends ErrorResponse {
	token: string;
}
