export interface User {
	username: string;
	email: string;
}

export interface UserRegister {
	email: string;
	password: string;
	password2: string;
}

export interface State {
	user: {
		data: User | Record<string, unknown>;
		token: string;
		loggedIn: boolean;
	};
	login: {
		loading: boolean;
		error: string;
	};
	logout: {
		loading: boolean;
		error: string;
	};
	register: {
		loading: boolean;
		error: string;
	};
	refresh: {
		loading: boolean;
		error: string;
	};
}
