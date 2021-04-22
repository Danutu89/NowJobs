export interface User {
	username: string;
	email: string;
	completed: boolean;
}

export interface UserRegister {
	email: string;
	password1: string;
	password2: string;
}

export interface State {
	user: {
		data: User;
		token: string;
		loggedIn: boolean;
	};
	login: {
		loading: boolean;
		error: {
			status: number;
			message: string;
		};
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
